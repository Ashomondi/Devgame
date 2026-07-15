import Phaser from "phaser";
import GameConfig from "../config/GameConfig";
import gameService from "../services/gameService";
import { PlayerAction } from "../../../shared/enums/playerActions";

const BASE_Y = 60;

export default class LobbyScene extends Phaser.Scene {
  constructor() {
    super("LobbyScene");
    this.gameId = null;
    this.players = [];
    this.isHost = false;
    this.unsub = null;
    this.joinContainer = null;
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(0x0b1020);

    this.add.text(width / 2, BASE_Y, "Monopoly Devgame", {
      fontFamily: "Arial", fontSize: "34px", color: "#e9eefc",
    }).setOrigin(0.5, 0);

    this.statusText = this.add.text(width / 2, BASE_Y + 50, "Setting up...", {
      fontFamily: "Arial", fontSize: "16px", color: "#5eead4",
    }).setOrigin(0.5, 0);

    this.roomIdText = this.add.text(width / 2, BASE_Y + 80, "", {
      fontFamily: "Arial", fontSize: "14px", color: "#7f8bb3",
    }).setOrigin(0.5, 0);

    this.playerListText = this.add.text(width / 2, BASE_Y + 120, "", {
      fontFamily: "Arial", fontSize: "15px", color: "#e9eefc", align: "center",
    }).setOrigin(0.5, 0);

    // Join Room section
    this.joinContainer = this.add.dom(width / 2, BASE_Y + 290).createFromHTML(`
      <div style="text-align:center;font-family:Arial,sans-serif;">
        <p style="color:#7f8bb3;font-size:14px;margin:0 0 8px 0;">or join an existing room</p>
        <div style="display:flex;gap:8px;align-items:center;justify-content:center;">
          <input id="join-room-input" type="text" placeholder="Room code"
            style="
              width:160px;padding:10px 12px;border:1px solid #2a3a5a;border-radius:8px;
              background:#0b1020;color:#e9eefc;font-size:15px;outline:none;
            "
          />
          <button id="join-room-btn" style="
            padding:10px 20px;background:#2a3a5a;color:#e9eefc;border:none;
            border-radius:8px;font-size:15px;font-weight:bold;cursor:pointer;
          ">Join</button>
        </div>
        <p id="join-error" style="color:#fb7185;font-size:13px;margin:6px 0 0 0;min-height:18px;"></p>
      </div>
    `);

    this.joinContainer.addListener("click");
    this.joinContainer.on("click", (event) => {
      if (event.target.id === "join-room-btn") {
        this._handleJoinRoom();
      }
    });

    this.joinContainer.addListener("keydown");
    this.joinContainer.on("keydown", (event) => {
      if (event.key === "Enter" && document.activeElement?.id === "join-room-input") {
        this._handleJoinRoom();
      }
    });

    const mkBtn = (y, label, color, onClick) => {
      const bg = this.add.rectangle(width / 2, y, 240, 52, color, 0.9)
        .setStrokeStyle(2, 0xffffff, 0.15)
        .setInteractive({ useHandCursor: true });
      const txt = this.add.text(width / 2, y, label, {
        fontFamily: "Arial", fontSize: "18px", color: "#ffffff",
      }).setOrigin(0.5);
      bg.on("pointerup", onClick);
      bg.on("pointerover", () => bg.setFillStyle(color, 1));
      bg.on("pointerout", () => bg.setFillStyle(color, 0.9));
      return { bg, txt };
    };

    this.startBtn = mkBtn(BASE_Y + 210, "Start Match", 0x1a5a5a, () => {
      if (this.isHost && this.players.length >= 2) this._startMatch();
    });

    mkBtn(BASE_Y + 360, "Quick Demo (Local)", 0x2a2a4a, () => {
      gameService.disconnect();
      this.scene.start("GameScene", { gameId: null });
    });

    this._createLobby();
  }

  async _createLobby() {
    const baseUrl = GameConfig.apiBaseUrl;
    const playerName = sessionStorage.getItem("playerId") || "guest";

    try {
      const created = await fetch(`${baseUrl}/lobby/create`, { method: "POST" });
      if (!created.ok) throw new Error("HTTP " + created.status);
      const data = await created.json();
      this.gameId = data.roomId || data.gameId;
      this.isHost = true;

      await fetch(`${baseUrl}/lobby/${this.gameId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, playerId: playerName }),
      });

      this.roomIdText.setText(`Room: ${this.gameId}`);
      this.statusText.setText("Connecting...");
      this.players = [playerName];
      this._renderPlayers();
      this._connectWS();
    } catch (e) {
      this.statusText.setText("Server offline. Use Quick Demo instead.");
    }
  }

  async _handleJoinRoom() {
    const input = document.getElementById("join-room-input");
    const errorEl = document.getElementById("join-error");
    const code = input?.value?.trim();
    if (!code) {
      if (errorEl) errorEl.textContent = "Enter a room code.";
      return;
    }

    const baseUrl = GameConfig.apiBaseUrl;
    const playerName = sessionStorage.getItem("playerId") || "guest";

    try {
      const res = await fetch(`${baseUrl}/lobby/${code}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, playerId: playerName }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (errorEl) errorEl.textContent = err.error || "Room not found.";
        return;
      }

      const data = await res.json();
      this.gameId = data.roomId || code;
      this.isHost = false;

      if (errorEl) errorEl.textContent = "";
      if (input) input.value = "";

      if (this.unsub) this.unsub();
      gameService.disconnect();
      this.roomIdText.setText(`Room: ${this.gameId}`);
      this.statusText.setText("Connecting...");
      this.players = [];
      this._renderPlayers();
      this._connectWS();
    } catch (e) {
      if (errorEl) errorEl.textContent = "Server unreachable.";
    }
  }

  _connectWS() {
    gameService.disconnect();
    const token = sessionStorage.getItem("playerId") || "guest";
    gameService.connect(this.gameId, token);

    this.unsub = gameService.subscribe((event) => {
      if (event.type === "player_connected") {
        const pid = event.payload?.playerId || event.playerId;
        if (pid && !this.players.includes(pid)) {
          this.players.push(pid);
          this._renderPlayers();
        }
      } else if (event.type === "player_disconnected") {
        const pid = event.payload?.playerId || event.playerId;
        this.players = this.players.filter(p => p !== pid);
        this._renderPlayers();
      } else if (event.type === "game_started") {
        this.scene.start("GameScene", { gameId: this.gameId });
      }
    });

    this.statusText.setText("Waiting for players...");
  }

  _renderPlayers() {
    const list = this.players.length
      ? this.players.map((p, i) => `${i + 1}. ${p}`).join("\n")
      : "(waiting for players...)";
    this.playerListText.setText(`Players in room:\n${list}`);
    const enabled = this.isHost && this.players.length >= 2;
    this.startBtn.bg.setAlpha(enabled ? 1 : 0.35);
    this.startBtn.txt.setAlpha(enabled ? 1 : 0.35);
  }

  _startMatch() {
    this.statusText.setText("Starting game...");
    gameService.sendAction(PlayerAction.START_GAME, {}).then(() => {}).catch(() => {
      this.statusText.setText('Server unreachable. Starting local demo...');
      this.time.delayedCall(1500, () => {
        this.scene.start('GameScene', { gameId: null });
      });
    });
  }

  shutdown() {
    if (this.unsub) this.unsub();
    if (this.joinContainer) this.joinContainer.removeListener();
  }
}

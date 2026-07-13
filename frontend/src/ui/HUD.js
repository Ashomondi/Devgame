export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(50);
    this.elements = [];
    this.players = [];
  }

  create(x) {
    this.baseX = x == null ? 1000 : x;

    const titleBg = this.scene.add.graphics();
    titleBg.fillStyle(0x121a2e, 0.95);
    titleBg.fillRoundedRect(this.baseX - 100, 10, 200, 36, 8);
    titleBg.lineStyle(1, 0x5eead4, 0.3);
    titleBg.strokeRoundedRect(this.baseX - 100, 10, 200, 36, 8);
    this.container.add(titleBg);

    const title = this.scene.add.text(this.baseX, 28, 'PLAYERS', {
      fontFamily: 'Arial', fontSize: '14px', color: '#5eead4', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);
    this.container.add(title);
  }

  update(playerList, currentPlayerId, phase) {
    this.clearPlayers();
    this.players = playerList || [];

    const x = this.baseX;
    let y = 58;

    for (const p of this.players) {
      const isTurn = p.id === currentPlayerId;
      const bgColor = isTurn ? 0x1a2a4a : 0x121a2e;
      const borderColor = isTurn ? 0x5eead4 : 0x2a3a5a;

      const bg = this.scene.add.graphics();
      bg.fillStyle(bgColor, 0.95);
      bg.fillRoundedRect(x - 100, y, 200, 110, 8);
      bg.lineStyle(isTurn ? 2 : 1, borderColor, isTurn ? 0.8 : 0.4);
      bg.strokeRoundedRect(x - 100, y, 200, 110, 8);

      const nameText = this.scene.add.text(x, y + 14, p.name || `Player ${p.id}`, {
        fontFamily: 'Arial', fontSize: '15px',
        color: isTurn ? '#5eead4' : '#e9eefc',
        fontStyle: isTurn ? 'bold' : 'normal',
      }).setOrigin(0.5, 0);

      const cashText = this.scene.add.text(x, y + 36, `Cash: KES ${Number(p.cash || 0).toLocaleString()}`, {
        fontFamily: 'Arial', fontSize: '13px', color: '#34d399',
      }).setOrigin(0.5, 0);

      const netWorthText = this.scene.add.text(x, y + 56, `Worth: KES ${Number(p.getNetWorth ? p.getNetWorth() : p.cash || 0).toLocaleString()}`, {
        fontFamily: 'Arial', fontSize: '13px', color: '#7f8bb3',
      }).setOrigin(0.5, 0);

      const propsText = this.scene.add.text(x, y + 76, `Properties: ${p.ownedProperties?.length || 0}`, {
        fontFamily: 'Arial', fontSize: '13px', color: '#7f8bb3',
      }).setOrigin(0.5, 0);

      const turnBadge = isTurn ? this.scene.add.text(x + 80, y + 12, '●', {
        fontFamily: 'Arial', fontSize: '18px', color: '#5eead4',
      }).setOrigin(0.5, 0) : null;

      this.container.add(bg);
      this.container.add(nameText);
      this.container.add(cashText);
      this.container.add(netWorthText);
      this.container.add(propsText);
      if (turnBadge) this.container.add(turnBadge);

      y += 120;
    }
  }

  clearPlayers() {
    while (this.container.length > 1) {
      const obj = this.container.getAt(this.container.length - 1);
      this.container.remove(obj, true);
    }
  }

  destroy() {
    this.container.destroy();
  }
}

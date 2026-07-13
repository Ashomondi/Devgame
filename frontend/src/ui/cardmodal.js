export default class CardModal {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(200);
    this.container.setVisible(false);
    this.callback = null;
  }

  create() {
    const { width, height } = this.scene.scale;

    const overlay = this.scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);

    this.bg = this.scene.add.graphics();
    this.titleText = this.scene.add.text(width / 2, height / 2 - 80, '', {
      fontFamily: 'Arial', fontSize: '13px', color: '#7f8bb3', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.cardText = this.scene.add.text(width / 2, height / 2 - 20, '', {
      fontFamily: 'Arial', fontSize: '18px', color: '#e9eefc', fontStyle: 'bold',
      align: 'center', wordWrap: { width: 300 },
    }).setOrigin(0.5, 0.5);

    this.effectText = this.scene.add.text(width / 2, height / 2 + 30, '', {
      fontFamily: 'Arial', fontSize: '14px', color: '#34d399',
    }).setOrigin(0.5, 0.5);

    this.btnBg = this.scene.add.graphics();

    this.btnText = this.scene.add.text(width / 2, height / 2 + 80, 'Draw Card', {
      fontFamily: 'Arial', fontSize: '16px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.btnHit = this.scene.add.rectangle(width / 2, height / 2 + 80, 200, 40)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5, 0.5);

    this.btnHit.on('pointerup', () => {
      if (this.callback) this.callback();
    });

    this.container.add([overlay, this.bg, this.titleText, this.cardText, this.effectText, this.btnBg, this.btnText, this.btnHit]);
  }

  show(deckType, card, onDraw) {
    const { width, height } = this.scene.scale;

    const isChance = deckType === 'chance';
    const color = isChance ? 0xfbbf24 : 0x4ade80;
    const title = isChance ? '🎲 CHANCE' : '📦 COMMUNITY CHEST';

    this.bg.clear();
    this.bg.fillStyle(0x0d1424, 0.95);
    this.bg.fillRoundedRect(width / 2 - 180, height / 2 - 110, 360, 220, 12);
    this.bg.lineStyle(2, color, 0.6);
    this.bg.strokeRoundedRect(width / 2 - 180, height / 2 - 110, 360, 220, 12);

    this.titleText.setText(title);

    if (card) {
      this.cardText.setText(card.title);
      this._showEffect(card);
      this.btnText.setText('OK');
      this.callback = onDraw;
    } else {
      this.cardText.setText('');
      this.effectText.setText('');
      this.btnText.setText('Draw Card');
      this.callback = onDraw;
    }

    this._drawButton(color);
    this.container.setVisible(true);
  }

  _showEffect(card) {
    const amount = card.amount || 0;
    if (amount > 0) this.effectText.setText(`+ KES ${amount.toLocaleString()}`);
    else if (amount < 0) this.effectText.setText(`- KES ${Math.abs(amount).toLocaleString()}`);
    else if (card.effect === 'go_to_jail') this.effectText.setText('Go directly to Jail!');
    else if (card.effect === 'move' || card.effect === 'advance') this.effectText.setText(`Move to tile ${card.target || 0}`);
    else if (card.effect === 'jail_free') this.effectText.setText('Keep this card for later');
    else this.effectText.setText('');
  }

  _drawButton(color) {
    const { width, height } = this.scene.scale;
    this.btnBg.clear();
    this.btnBg.fillStyle(color, 0.8);
    this.btnBg.fillRoundedRect(width / 2 - 100, height / 2 + 60, 200, 40, 8);
  }

  hide() {
    this.container.setVisible(false);
    this.callback = null;
  }

  destroy() {
    this.container.destroy();
  }
}

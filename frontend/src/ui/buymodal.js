export default class BuyModal {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(200);
    this.container.setVisible(false);
    this.callback = null;
    this.data = null;
  }

  create() {
    const { width, height } = this.scene.scale;

    const overlay = this.scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);
    overlay.setInteractive();

    const panelX = width / 2;
    const panelY = height / 2;

    const panel = this.scene.add.graphics();
    panel.fillStyle(0x121a33, 0.98);
    panel.fillRoundedRect(panelX - 150, panelY - 100, 300, 200, 12);
    panel.lineStyle(2, 0x5eead4, 1);
    panel.strokeRoundedRect(panelX - 150, panelY - 100, 300, 200, 12);

    this.titleText = this.scene.add.text(panelX, panelY - 75, '', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#e9eefc',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.priceText = this.scene.add.text(panelX, panelY - 45, '', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#7f8bb3',
    }).setOrigin(0.5, 0.5);

    const mkBtn = (label, y, color, callback) => {
      const btn = this.scene.add.rectangle(panelX, y, 200, 40, color, 0.9)
        .setStrokeStyle(1, 0xffffff, 0.2)
        .setInteractive({ useHandCursor: true });
      const txt = this.scene.add.text(panelX, y, label, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold',
      }).setOrigin(0.5, 0.5);
      btn.on('pointerup', () => {
        if (this.callback) this.callback(callback);
        this.hide();
      });
      return [btn, txt];
    };

    const buyBtn = mkBtn('Buy', panelY, 0x34d399, 'buy');
    const passBtn = mkBtn('Pass', panelY + 50, 0xfb7185, 'pass');

    this.buttons = [overlay, panel, this.titleText, this.priceText, ...buyBtn, ...passBtn];
    this.container.add(this.buttons);

    this.elements = { overlay, panel, titleText: this.titleText, priceText: this.priceText };
  }

  show(tileData, onChoice) {
    this.callback = onChoice;
    this.data = tileData;
    this.titleText.setText(tileData.name || 'Property');
    this.priceText.setText(`Price: KES ${(tileData.price || 0).toLocaleString()}`);
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
    this.callback = null;
  }

  destroy() {
    this.container.destroy();
  }
}

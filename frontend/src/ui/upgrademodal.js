export default class UpgradeModal {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(200);
    this.container.setVisible(false);
    this.callback = null;
    this.items = [];
  }

  create() {
    const { width, height } = this.scene.scale;

    this.overlay = this.scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);
    this.overlay.setInteractive();

    this.panel = this.scene.add.graphics();
    this.panelX = width / 2;
    this.panelY = height / 2;

    this.titleText = this.scene.add.text(width / 2, height / 2 - 120, 'Upgrade Properties', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#e9eefc',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.listY = height / 2 - 80;

    this.container.add([this.overlay, this.panel, this.titleText]);
  }

  show(upgradableProperties, onChoose) {
    this.callback = onChoose;
    this.items = upgradableProperties || [];
    this._render();
    this.container.setVisible(true);
  }

  _render() {
    while (this.container.length > 3) {
      const obj = this.container.getAt(this.container.length - 1);
      this.container.remove(obj, true);
    }

    const panelW = 280;
    const panelH = 80 + this.items.length * 45;
    const panelY = this.panelY - 60 + panelH / 2;

    this.panel.clear();
    this.panel.fillStyle(0x121a33, 0.98);
    this.panel.fillRoundedRect(this.panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 12);
    this.panel.lineStyle(2, 0x5eead4, 1);
    this.panel.strokeRoundedRect(this.panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 12);

    this.titleText.setY(panelY - panelH / 2 + 25);

    if (this.items.length === 0) {
      const txt = this.scene.add.text(this.panelX, panelY, 'No upgradable properties', {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#7f8bb3',
      }).setOrigin(0.5, 0.5);
      this.container.add(txt);
      return;
    }

    let y = panelY - panelH / 2 + 55;
    this.items.forEach((item, i) => {
      const name = item.name || `Property ${item.pos}`;
      const cost = item.cost || 0;
      const lvl = item.level || 0;

      const txt = this.scene.add.text(this.panelX - 100, y, `${name} (Lvl ${lvl})`, {
        fontFamily: 'Arial',
        fontSize: '13px',
        color: '#e9eefc',
      });

      const btn = this.scene.add.rectangle(this.panelX + 100, y, 70, 28, 0x5eead4, 0.9)
        .setInteractive({ useHandCursor: true });
      const btnTxt = this.scene.add.text(this.panelX + 100, y, `KES ${cost}`, {
        fontFamily: 'Arial',
        fontSize: '11px',
        color: '#0b1020',
        fontStyle: 'bold',
      }).setOrigin(0.5, 0.5);

      btn.on('pointerup', () => {
        if (this.callback) this.callback(item);
        this.hide();
      });

      this.container.add([txt, btn, btnTxt]);
      y += 40;
    });
  }

  hide() {
    this.container.setVisible(false);
    this.callback = null;
  }

  destroy() {
    this.container.destroy();
  }
}

export default class RentModal {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(200);
    this.container.setVisible(false);
    this.callback = null;
  }

  create() {
    const { width, height } = this.scene.scale;
    const cx = width / 2;
    const cy = height / 2;

    const overlay = this.scene.add.rectangle(cx, cy, width, height, 0x000000, 0.6);

    this.bg = this.scene.add.graphics();

    this.titleText = this.scene.add.text(cx, cy - 70, '', {
      fontFamily: 'Arial', fontSize: '14px', color: '#fb7185', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.payerText = this.scene.add.text(cx, cy - 35, '', {
      fontFamily: 'Arial', fontSize: '20px', color: '#e9eefc', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.ownerText = this.scene.add.text(cx, cy - 5, '', {
      fontFamily: 'Arial', fontSize: '15px', color: '#7f8bb3',
    }).setOrigin(0.5, 0.5);

    this.rentText = this.scene.add.text(cx, cy + 25, '', {
      fontFamily: 'Arial', fontSize: '18px', color: '#fbbf24', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.balanceText = this.scene.add.text(cx, cy + 55, '', {
      fontFamily: 'Arial', fontSize: '14px', color: '#34d399',
    }).setOrigin(0.5, 0.5);

    this.btnBg = this.scene.add.graphics();
    this.btnText = this.scene.add.text(cx, cy + 90, 'Pay Rent', {
      fontFamily: 'Arial', fontSize: '16px', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.btnHit = this.scene.add.rectangle(cx, cy + 90, 200, 40)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5, 0.5);

    this.btnHit.on('pointerup', () => {
      if (this.callback) this.callback();
      this.hide();
    });

    this.container.add([overlay, this.bg, this.titleText, this.payerText, this.ownerText, this.rentText, this.balanceText, this.btnBg, this.btnText, this.btnHit]);
  }

  show(payerName, ownerName, rent, balance, onPay) {
    const { width, height } = this.scene.scale;
    const cx = width / 2;
    const cy = height / 2;

    this.bg.clear();
    this.bg.fillStyle(0x0d1424, 0.95);
    this.bg.fillRoundedRect(cx - 170, cy - 95, 340, 210, 12);
    this.bg.lineStyle(2, 0xfb7185, 0.5);
    this.bg.strokeRoundedRect(cx - 170, cy - 95, 340, 210, 12);

    this.titleText.setText('💰 Rent Due');
    this.payerText.setText(payerName);
    this.ownerText.setText(`→ ${ownerName}`);
    this.rentText.setText(`KES ${rent.toLocaleString()}`);
    this.balanceText.setText(`Your balance: KES ${balance.toLocaleString()}`);

    this.btnBg.clear();
    this.btnBg.fillStyle(0xfb7185, 0.8);
    this.btnBg.fillRoundedRect(cx - 100, cy + 70, 200, 40, 8);

    this.callback = onPay;
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

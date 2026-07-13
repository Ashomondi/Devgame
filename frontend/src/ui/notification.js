export default class Notification {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(150);
    this.queue = [];
    this.active = false;
  }

  create(x, y) {
    this.bg = this.scene.add.graphics();
    this.container.add(this.bg);

    this.text = this.scene.add.text(0, 0, '', {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#e9eefc',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: 360 },
    }).setOrigin(0.5, 0.5).setAlpha(0);

    this.container.add(this.text);
    this.container.setPosition(x || 388, y || 358);
  }

  push(message) {
    this.queue.push(message);
    if (!this.active) this._next();
  }

  _next() {
    if (this.queue.length === 0) {
      this.active = false;
      return;
    }

    this.active = true;
    const msg = this.queue.shift();

    this.bg.clear();
    this.bg.fillStyle(0x0b1020, 0.92);
    this.bg.fillRoundedRect(-180, -24, 360, 48, 8);
    this.bg.lineStyle(1, 0x5eead4, 0.4);
    this.bg.strokeRoundedRect(-180, -24, 360, 48, 8);

    this.text.setText(msg);
    this.text.setAlpha(1);

    this.scene.tweens.killTweensOf(this.text);

    this.scene.tweens.add({
      targets: this.text,
      alpha: 0,
      duration: 600,
      delay: 3750,
      ease: 'Power2',
      onComplete: () => {
        this.text.setText('');
        this.text.setAlpha(0);
        this.bg.clear();
        this._next();
      },
    });
  }

  destroy() {
    this.container.destroy();
  }
}

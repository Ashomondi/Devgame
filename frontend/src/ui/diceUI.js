export default class DiceUI {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(100);
    this.die1 = null;
    this.die2 = null;
    this.visible = false;
  }

  create(x, y, dieSize = 50) {
    this.x = x;
    this.y = y;
    this.dieSize = dieSize;
    this.container.setPosition(x, y);
    this._buildBackdrop();
    this._buildDice();
    this.hide();
  }

  _buildBackdrop() {
    const gap = this.dieSize * 0.7;
    const pad = 14;
    const w = this.dieSize * 2 + gap * 2 + pad * 2;
    const h = this.dieSize + pad * 2;
    const bg = this.scene.add.graphics();
    bg.fillStyle(0x0b1020, 0.85);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 10);
    bg.lineStyle(1, 0x5eead4, 0.4);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 10);
    this.container.add(bg);
    this.container.sendToBack(bg);
  }

  _buildDice() {
    const g1 = this.scene.add.graphics();
    const g2 = this.scene.add.graphics();
    const s = this.dieSize;
    const gap = s * 0.7;
    this.die1 = { graphics: g1, value: 1 };
    this.die2 = { graphics: g2, value: 1 };
    this._drawDie(this.die1, 1, -gap, 0);
    this._drawDie(this.die2, 1, gap, 0);
    this.container.add([g1, g2]);
  }

  _drawDie(die, value, x, y) {
    const g = die.graphics;
    g.clear();
    const s = this.dieSize;
    const r = s * 0.12;
    const dotR = s * 0.1;

    g.fillStyle(0xffffff, 1);
    g.fillRoundedRect(x - s / 2, y - s / 2, s, s, r);
    g.lineStyle(2, 0x333333, 1);
    g.strokeRoundedRect(x - s / 2, y - s / 2, s, s, r);

    const off = s * 0.24;
    const dotPositions = {
      1: [[0, 0]],
      2: [[-off, -off], [off, off]],
      3: [[-off, -off], [0, 0], [off, off]],
      4: [[-off, -off], [off, -off], [-off, off], [off, off]],
      5: [[-off, -off], [off, -off], [0, 0], [-off, off], [off, off]],
      6: [[-off, -off], [off, -off], [-off, 0], [off, 0], [-off, off], [off, off]],
    };

    const dots = dotPositions[value] || dotPositions[1];
    for (const [dx, dy] of dots) {
      g.fillStyle(0x1a1a2e, 1);
      g.fillCircle(x + dx, y + dy, dotR);
    }

    die.value = value;
  }

  show() {
    this.container.setVisible(true);
    this.visible = true;
  }

  hide() {
    this.container.setVisible(false);
    this.visible = false;
  }

  setValues(v1, v2) {
    const gap = this.dieSize * 0.7;
    this._drawDie(this.die1, v1, -gap, 0);
    this._drawDie(this.die2, v2, gap, 0);
  }

  async animateRoll(result) {
    return new Promise((resolve) => {
      let count = 0;
      const maxRolls = 8;
      const v1 = result?.results?.[0] ?? 1;
      const v2 = result?.results?.[1] ?? 1;
      const gap = this.dieSize * 0.7;

      const interval = this.scene.time.addEvent({
        delay: 80,
        repeat: maxRolls - 1,
        callback: () => {
          const r1 = Math.floor(Math.random() * 6) + 1;
          const r2 = Math.floor(Math.random() * 6) + 1;
          this._drawDie(this.die1, r1, -gap, 0);
          this._drawDie(this.die2, r2, gap, 0);
          count++;
          if (count >= maxRolls) {
            this._drawDie(this.die1, v1, -gap, 0);
            this._drawDie(this.die2, v2, gap, 0);
            interval.remove();
            resolve();
          }
        },
      });
    });
  }

  destroy() {
    this.container.destroy();
  }
}

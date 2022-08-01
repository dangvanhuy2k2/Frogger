export default class Ripple {
  constructor(x, y) {
    this.radius = Math.random() * 20 + 1;
    this.x = x;
    this.y = y;
    this.opacity = 1;
    this.markForDeletion = false;
  }

  update() {
    if (this.radius < 50) this.radius += 0.8;
    else this.markForDeletion = true;
    if (this.opacity > 0.02) this.opacity -= 0.02;
    else this.markForDeletion = true;
  }

  draw(c) {
    c.beginPath();
    c.strokeStyle = `rgba(150,150, 150,` + this.opacity + `)`;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.closePath();
    c.stroke();
    // c.fillRect(this.x, this.y, this.radius * 10, this.radius * 10);
  }
}

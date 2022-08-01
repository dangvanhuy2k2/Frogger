export default class Particle {
  constructor(x, y) {
    this.radius = Math.random() * 20 + 1;
    this.x = x;
    this.y = y;
    this.opacity = 1;
    this.directionX = Math.random() * 1 - 0.5;
    this.directionY = Math.random() * 1 - 0.5;
    this.markForDeletion = false;
  }

  update() {
    if (this.opacity > 0.1) this.opacity -= 0.9;
    if (this.radius > 0.15) this.radius -= 0.15;
    else this.markForDeletion = true;
    this.x += this.directionX;
    this.y += this.directionY;
  }

  draw(c) {
    c.beginPath();
    c.fillStyle = `rgba(150,150, 150,` + this.opacity + `)`;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }
}

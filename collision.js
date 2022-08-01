export default class Collison {
  constructor({ game, x, y, frameY, sizeModifiSize = 1 }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.frameY = frameY;
    this.frameX = 0;
    this.maxFrameX = 1;
    this.maxFrameY = 2;
    this.image = new Image();
    this.image.src = "./assets/collisions.png";
    this.spriteWidth = this.image.width / this.maxFrameX;
    this.spriteHeight = this.image.height / this.maxFrameY;
    this.sizeModifiSize = 1.4;
    this.width = this.spriteWidth / this.sizeModifiSize;
    this.height = this.spriteHeight / this.sizeModifiSize;
    this.markForDeletion = false;
    this.timer = 0;
    this.interval = 20;
  }

  update() {
    ++this.timer;
    if (this.timer >= this.interval) this.markForDeletion = true;
  }

  draw(c) {
    if (this.game.debug) {
      c.strokeStyle = "red";
      c.strokeRect(this.x, this.y, this.width, this.height);
    }
    // c.fillRect(this.x, this.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

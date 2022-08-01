export default class Frogger {
  constructor(game, image) {
    this.game = game;
    this.image = new Image();
    this.image.src = "./assets/frog_spritesheet.png";
    this.maxFrameX = 2;
    this.maxFrameY = 4;
    this.spriteWidth = this.image.width / this.maxFrameX;
    this.spriteHeight = this.image.height / this.maxFrameY;
    this.width = this.spriteWidth / 4;
    this.height = this.spriteHeight / 4;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height - 30;
    this.moving = false;
    this.frameX = 0;
    this.frameY = 0;
  }

  update() {
    //up
    if (this.game.input.keys["38"]) {
      if (!this.moving) {
        this.y -= this.game.grid;
        this.moving = true;
        this.frameY = 0;
      }
    }

    //down
    if (this.game.input.keys["40"]) {
      if (!this.moving && this.y < this.game.height - this.height * 2) {
        this.y += this.game.grid;
        this.moving = true;
        this.frameY = 3;
      }
    }

    //left
    if (this.game.input.keys["37"]) {
      if (!this.moving && this.x > this.width) {
        this.x -= this.game.grid;
        this.moving = true;
        this.frameY = 1;
        this.frameY = 2;
      }
    }

    //right
    if (this.game.input.keys["39"]) {
      if (!this.moving && this.x < this.game.width - this.width * 2) {
        this.x += this.game.grid;
        this.moving = true;
        this.frameY = 1;
      }
    }

    if (this.y < 0) this.#scored();
    if (this.x < -this.width || this.x >= this.game.width) this.game.reset();
  }

  #scored() {
    ++this.game.score;
    this.game.gameSpeed += 0.05;

    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height - 40;
  }

  draw(c) {
    if (this.game.debug) {
      c.strokeRect(this.x, this.y, this.width, this.height);
    }
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

  jump() {
    this.frameX++;
    // if (this.frameX >= this.maxFrameX) this.frameX = 0;
  }
}

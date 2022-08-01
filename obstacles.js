class Obstacle {
  constructor({
    x,
    y,
    imageSrc,
    speed = 1,
    type = "cars",
    maxFrameX = 1,
    maxFrameY = 1,
    frameX = 0,
    modifiSize = 1,
    game,
  }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;
    this.maxFrameX = maxFrameX;
    this.maxFrameY = maxFrameY;
    this.spriteWidth = this.image.width / this.maxFrameX;
    this.spriteHeight = this.image.height / this.maxFrameY;
    this.width = this.spriteWidth * modifiSize;
    this.height = this.spriteHeight * modifiSize;
    this.type = type;
    this.speed = speed;
    this.frameX = frameX;
    this.timer = 0;
  }
  update() {
    this.x += this.speed * this.game.gameSpeed;

    if (this.speed > 0) {
      if (this.x >= canvas1.width) {
        this.x = -this.width * 2;
        this.frameY = Math.floor(Math.random() * this.maxFrameY);
      }
    } else {
      if (this.x < -this.width) {
        this.x = canvas1.width + this.width;
        this.frameY = Math.floor(Math.random() * this.maxFrameY);
      }
    }
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
}

export class Turtle extends Obstacle {
  constructor({ x, y, speed, type, game }) {
    super({
      x,
      y,
      imageSrc: "./assets/turtles.png",
      speed,
      type,
      maxFrameX: 2,
      maxFrameY: 4,
      game,
    });

    this.frameY = Math.floor(Math.random() * this.maxFrameY);
  }

  update() {
    super.update();
    ++this.timer;
    if (this.timer % 20 === 0) {
      ++this.frameX;
      if (this.frameX >= this.maxFrameX) this.frameX = 0;
    }
  }
}

export class Car extends Obstacle {
  constructor({ x, y, speed, type, game }) {
    super({
      x,
      y,
      imageSrc: "./assets/cars.png",
      speed,
      type,
      maxFrameX: 2,
      maxFrameY: 3,
      game,
    });

    this.frameY = Math.floor(Math.random() * this.maxFrameY);
    this.frameX = this.speed > 0 ? 0 : 1;
  }
}

export class Log extends Obstacle {
  constructor({ x, y, speed, type, game }) {
    super({
      x,
      y,
      imageSrc: "./assets/log.png",
      speed,
      type,
      maxFrameX: 1,
      maxFrameY: 1,
      game,
    });
    this.frameY = Math.floor(Math.random() * this.maxFrameY);
    this.frameX = 0;
  }
}

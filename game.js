import InputHandler from "./inputhandler.js";
import Frogger from "./frogger.js";
import { Car, Log, Turtle } from "./obstacles.js";
import Collison from "./collision.js";
import Ripple from "./ripples.js";
import Background from "./background.js";
import { checkCollison } from "./utilities.js";
import Particle from "./particles.js";

window.addEventListener("load", () => {
  const canvas1 = document.getElementById("canvas1");
  const ctx1 = canvas1.getContext("2d");
  canvas1.width = 600;
  canvas1.height = 600;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;

      this.frogger = new Frogger(this);
      this.input = new InputHandler(this);
      this.background = new Background(this);

      this.grid = 80;
      this.score = 0;
      this.collisionCount = 0;
      this.frame = 0;
      this.gameSpeed = 1;
      this.maxParticles = 200;

      this.particles = [];
      this.ripples = [];
      this.cars = [];
      this.logs = [];
      this.collisions = [];

      this.debug = false;

      this.#initObstacles();
    }

    reset() {
      this.frogger.x = canvas1.width / 2 - this.frogger.width / 2;
      this.frogger.y = canvas1.height - this.frogger.height - 30;
      this.score = 0;
      ++this.collisionCount;
      this.gameSpeed = 1;
    }

    #filterArray() {
      this.collisions = this.collisions.filter(
        (collision) => !collision.markForDeletion
      );
      this.particles = this.particles.filter(
        (particle) => !particle.markForDeletion
      );
      this.ripples = this.ripples.filter((ripple) => !ripple.markForDeletion);
    }

    #checkDropWater() {
      if (this.frogger.y < 250 && this.frogger.y > 80) {
        const isSafe = this.logs.some((log) =>
          checkCollison(log, this.frogger)
        );

        if (!isSafe) {
          this.collisions.push(
            new Collison({
              game: this,
              x: this.frogger.x,
              y: this.frogger.y,
              frameY: 0,
            })
          );
          this.reset();
        }
      }
    }

    update() {
      //obstacles
      this.cars.forEach((car) => {
        car.update();

        if (checkCollison(car, this.frogger)) {
          this.collisions.push(
            new Collison({
              game: this,
              x: this.frogger.x,
              y: this.frogger.y,
              frameY: 1,
            })
          );
          this.reset();
        }
      });

      // this.#checkDropWater();

      this.logs.forEach((log) => {
        log.update();
        if (checkCollison(log, this.frogger)) this.frogger.x += log.speed;
      });

      this.collisions.forEach((collision) => collision.update());

      this.particles.forEach((particle) => particle.update());
      this.ripples.forEach((ripple) => ripple.update());
      this.frogger.update();

      this.#filterArray();
      this.#handleParticles();
      this.#handleRipples();
    }

    draw(c) {
      this.background.draw(c);

      this.cars.forEach((car) => car.draw(c));

      this.logs.forEach((log) => log.draw(c));

      this.particles.forEach((particle) => particle.draw(c));

      this.ripples.forEach((ripple) => ripple.draw(c));

      this.collisions.forEach((collision) => collision.draw(c));

      this.frogger.draw(c);

      this.#handleDisplayText(c);
    }

    #handleDisplayText(c) {
      c.strokeStyle = "black";
      c.font = "15px monospace";
      c.save();
      c.textAlign = "center";
      c.strokeText("Score", canvas1.width * 0.5 - 14, 15);
      c.font = "50px monospace";
      c.strokeText(this.score, canvas1.width * 0.5 - 14, 55);
      c.restore();

      c.fillStyle = "black";
      c.font = "15px monospacesty";
      c.fillText("Collisons: " + this.collisionCount, 10, 175);

      c.font = "15px monospace";
      c.fillText("Game speed: " + this.gameSpeed.toFixed(1), 10, 190);
    }

    #initObstacles() {
      //lane 1
      for (let i = 0; i < 2; ++i) {
        let x = i * 350;
        this.cars.push(
          new Car({
            x,
            y: canvas1.height - this.grid * 2 - 20,
            speed: 1,
            type: "car",
            game: this,
          })
        );
      }

      //lane 2
      for (let i = 0; i < 2; ++i) {
        let x = i * 300;
        this.cars.push(
          new Car({
            x,
            y: canvas1.height - this.grid * 3 - 20,
            speed: -1,
            type: "car",
            game: this,
          })
        );
      }

      //lane 3
      for (let i = 0; i < 2; ++i) {
        let x = i * 400;
        this.cars.push(
          new Car({
            x,
            y: canvas1.height - this.grid * 4 - 20,
            speed: 1,
            type: "car",
            game: this,
          })
        );
      }

      //lane 4
      for (let i = 0; i < 2; ++i) {
        let x = i * 400;
        this.logs.push(
          new Log({
            x,
            y: canvas1.height - this.grid * 5 - 25,
            speed: -2,
            type: "log",
            game: this,
          })
        );
      }

      // // lane 5
      for (let i = 0; i < 3; ++i) {
        let x = i * 200;
        this.logs.push(
          new Turtle({
            x,
            y: canvas1.height - this.grid * 6 - 20,
            speed: 1,
            type: "turtle",
            game: this,
          })
        );
      }
    }

    #handleParticles = () => {
      if (this.particles.length >= this.maxParticles) {
        this.particles = this.particles.slice(0, this.particles.length - 30);
      }
      if (
        (this.input.keys["38"] ||
          this.input.keys["39"] ||
          this.input.keys["40"] ||
          this.input.keys["37"]) &&
        this.particles.length < this.maxParticles &&
        this.frogger.y > 250
      ) {
        for (let i = 0; i < 10; ++i) {
          this.particles.unshift(
            new Particle(
              this.frogger.x + this.frogger.width * 0.5,
              this.frogger.y + this.frogger.height * 0.5
            )
          );
        }
      }
    };

    #handleRipples = () => {
      if (
        (this.input.keys["38"] ||
          this.input.keys["39"] ||
          this.input.keys["40"] ||
          this.input.keys["37"]) &&
        this.frogger.y < 250 &&
        this.frogger.y > 80
      ) {
        this.ripples.unshift(
          new Ripple(
            this.frogger.x + this.frogger.width * 0.5,
            this.frogger.y + this.frogger.height * 0.5
          )
        );
      }
    };
  }

  const game = new Game(canvas1.width, canvas1.height);

  const animate = () => {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    game.draw(ctx1);
    game.update();
    requestAnimationFrame(animate);
  };

  animate();
});

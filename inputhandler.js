export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = {};

    window.addEventListener("keydown", (e) => {
      this.keys = {};
      this.keys[e.keyCode] = true;
      if (
        this.keys["37"] ||
        this.keys["38"] ||
        this.keys["39"] ||
        this.keys["40"]
      ) {
        this.game.frogger.frameX = 0;
        this.game.frogger.jump();
      }

      if (e.key === "d") this.game.debug = !this.game.debug;
    });

    window.addEventListener("keyup", (e) => {
      delete this.keys[e.keyCode];
      this.game.frogger.moving = false;
      this.game.frogger.frameX = 0;
    });
  }
}

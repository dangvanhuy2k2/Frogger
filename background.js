export default class Background {
  constructor(game) {
    this.game = game;

    this.backgroung_lv12 = new Image();
    this.backgroung_lv12.src = "./assets/background_lvl2.png";
    this.grass = new Image();
    this.grass.src = "./assets/grass.png";

    this.layers = [this.backgroung_lv12, this.grass];
  }

  draw(c) {
    this.layers.forEach((layer) =>
      c.drawImage(layer, 0, 0, this.game.width, this.game.height)
    );
  }
}

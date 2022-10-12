import Starship from './starship.js';
import Saucer from './saucer.js';
import Shoot from './shoot.js';


export default class Game {

  constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.starship = new Starship(Math.floor(canvas.height/2));
      this.saucers = [];
      this.shoots = [];
      this.score = 0;
      this.raf = null;
      this.flotteSoucoupe = false;
      this.interval;
  }


  addScore(x) {
      this.score += x;
      this.scoreBox.textContent = this.score;
  }


  moveAndDraw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // déplacer le vaisseau
      this.starship.move(this.canvas);
      // dessiner le vaisseau
      this.starship.draw(this.context);

      const oldLength = this.saucers.length;
      this.saucers = this.saucers.filter(this.saucerIsInLeftBound.bind(this));

      const newLength = this.saucers.length;
      const difference = oldLength - newLength;
      if(difference < 0){
          throw "A ship was added, but was not supposed to be";
      }
      if(difference > 0){
          this.addScore(-1000*difference);
      }
      this.saucers = this.saucers.filter(this.saucerIsInDownBound.bind(this));


      // vérification des collisions
      this.shoots.forEach(shoot => {
        const maybeASaucer = shoot.checkForCollisions(this.saucers);
        console.log(maybeASaucer);
        if(maybeASaucer) {
          maybeASaucer.destroyed = true;
          maybeASaucer.fall();
          this.addScore(200);
          this.shoots.splice(this.shoots.indexOf(shoot), 1);
        }
      });

      this.shoots = this.shoots.filter(shoot => !shoot.isDestroyed());

      this.shoots = this.shoots.filter(this.shotIsInBound.bind(this));

      this.saucers = this.saucers.filter(saucer => saucer.isIn(this.canvas));

      this.saucers.forEach(saucer => {
        saucer.move(this.canvas); // déplace la soucoupe
        saucer.draw(this.context); // dessine la soucoupe
      });


      // dessin des tirs
      this.shoots = this.shoots.filter(shoot => shoot.isIn(this.canvas));

      this.shoots.forEach(shoot => {
        shoot.move(this.canvas);
        shoot.draw(this.context);
      });

      this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
  }

  flotte() {
    if(this.flotteSoucoupe == false) {
      this.flotteSoucoupe = true;
      this.interval = window.setInterval(this.addSaucer.bind(this), 750);
    }
    else {
      this.flotteSoucoupe = false;
      clearInterval(this.interval);
    }
  }

  saucerIsInLeftBound(saucer) {
    if(saucer.x <= 0) {
      return false;
    }
    return true;
  }

  saucerIsInDownBound(saucer) {
    if(saucer.y >= this.canvas.height) {
      return false;
    }
    return true;
  }

  shotIsInBound(shot) {
    if(shot.x >= this.canvas.width) {
      return false;
    }
    return true;
  }


  keyUpActionHandler(event) {
    switch(event.key) {
      case "ArrowUp":
      case "Up":
      case "ArrowDown":
      case "Down":
          this.starship.stopMoving();
          break;
      default: return;
    }
    event.preventDefault();
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
          this.starship.moveUp();
          console.log(this.starship);
          break;
      case "ArrowDown":
      case "Down":
          this.starship.moveDown();
          console.log(this.starship);
          break;
      case " ":
          this.shoot();
          break;
      default: return;
    }
    event.preventDefault();
  }


  /**
   * Crée une soucoupe volante et l'ajoute à l'extrême droite du canvas
   * à une hauteur aléatoire à chaque apparition
   */
  addSaucer() {
    // les soucoupes apparaissent à droite du canvas
    const x = this.canvas.width;
    // les soucoupes apparaissent à une hauteur aléatoire
    const y = getRandomInt(this.canvas.height);
    let saucer = new Saucer(x, y);
    this.saucers.push(saucer);
    console.log(this.saucers);
  }

  shoot() {
    document.getElementById('nouvelleSoucoupe').blur();
    let x = this.starship.x;
    let y = this.starship.y + 10;
    this.shoots.push(new Shoot(x, y));
    console.log(this.shoots);
  }


}
/**
 * Retourne un entier aléatoire entre 0 et 'max'
 * @param {*} max la valeur maximale pouvant être prise par l'entier aléatoire
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

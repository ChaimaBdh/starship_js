// importation de la classe Game.js
import Game from './game.js';
import Starship from './starship.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
  const canvas = document.getElementById('stars');
  const game = new Game(canvas);
  const scoreBox = document.getElementById('score');
  game.scoreBox = scoreBox;

  // ajoute une soucoupe lors d'un clic
  const boutonSoucoupe = document.getElementById('nouvelleSoucoupe');

  window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
  window.addEventListener('keyup', game.keyUpActionHandler.bind(game));
  boutonSoucoupe.addEventListener('click', game.addSaucer.bind(game));

  document.getElementById('flotteSoucoupes').addEventListener('click', () => { game.flotte(); document.activeElement.blur(); });

  game.moveAndDraw();
}

window.addEventListener('load',init);

//
console.log('le bundle a été généré');

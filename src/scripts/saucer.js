import Mobile from './mobile.js';

import saucerImgSrc from '../assets/images/flyingSaucer-petit.png';

/**
 * Saucer class : a saucer is an enemy mobile which moves from the right to the left
 * to get the starShip
 */
export default class Saucer extends Mobile {
  static WIDTH = 36;

  constructor(x, y) {
    super(x, y, saucerImgSrc, Saucer.WIDTH, -3, 0);
  
  }

  destroy() {
    this.destroyed = true;
  }

  fall() {
    this.x += 0;
    this.y += 3;
  }

  move() {
    if(this.destroyed) {
      this.fall();
    } else {
      this.x += this.deltaX;
    }
  }


}

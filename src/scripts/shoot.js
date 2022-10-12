import shootImgSrc from '../assets/images/tir.png';

import Mobile from './mobile.js';

export default class Shoot extends Mobile {
  static WIDTH = 10;

  constructor(x, y) {
    super(x, y, shootImgSrc, Shoot.WIDTH, 8, 0);
  }


	isColliding(mobile) {
		const p1 = {x : this.x, y : this.y, width : this.width, height : this.image.height};
		const p2 = {x : mobile.x, y : mobile.y, width : mobile.width, height : mobile.image.height};
		if (p2.x < p1.x + p1.width &&
			p1.x + p1.width < p2.x + p2.width &&
			p2.y < p1.y + p1.height &&
			p1.y + p1.height < p2.height + p2.y && mobile.destroyed === false)
			return true;
		return false;
	}

	checkForCollisions(saucers) {
		let saucerToReturn = null
		saucers.forEach(saucer => {
			if(this.isColliding(saucer)) {
				console.log("returning saucer");
				saucerToReturn = saucer;
			}
		});
		return saucerToReturn;
	}

}

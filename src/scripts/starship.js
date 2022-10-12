import starshipImgSrc from '../assets/images/vaisseau-ballon-petit.png';
import Mobile from './mobile.js';
// import MoveState from './movestate.js';
const MoveState = { UP : 0, DOWN : 1, NONE : 2 };

export default class Starship extends Mobile {
  static WIDTH = 30;

  constructor(y){
      super(40, y, starshipImgSrc, Starship.WIDTH, 0, 8);
      this.moving = MoveState.NONE ;
  }

  get up() {
    return this.moving === MoveState.UP;
  }

  get down() {
    return this.moving === MoveState.DOWN;
  }

  stopMoving() {
    this.moving = MoveState.NONE;
  }

  moveUp() {
    this.moving = MoveState.UP;
    this.deltaY = -Math.abs(this.deltaY);
  }

  moveDown() {
    this.moving = MoveState.DOWN;
    this.deltaY = +Math.abs(this.deltaY);
  }

  move(canvas) {
    if(this.moving === MoveState.UP) {
      this.y = Math.max(0, this.y + this.deltaY);
    }
    if(this.moving === MoveState.DOWN) {
      this.y = Math.min(canvas.height - this.width, this.y + this.deltaY);
    }
  }


}

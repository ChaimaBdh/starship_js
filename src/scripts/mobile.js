import mobileImgSrc from '../assets/images/vaisseau-ballon-petit.png';

export default class Mobile{

  constructor(x, y, imgPath, width, dx=0, dy=0){
      this.imgPath = imgPath;
      this.image = this.createImage();
      this.width = width;
      this.x = x;
      this.y = y;
      this.deltaX = dx;
      this.deltaY = dy;
      this.destroyed = false;
  }

  createImage() {
    const mobileImg = new Image();
    mobileImg.width = this.width;
    mobileImg.src = this.imgPath;
    return mobileImg;
    }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  move(canvas) {
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  isIn(canvas) {
    return cmp(0, this.x, canvas.width) && cmp(0, this.y, canvas.height);
  }

  isDestroyed() {
    return this.destroyed;
  }

}

const cmp = (x, y, z) => {
  return x <= y && y <= z;
}

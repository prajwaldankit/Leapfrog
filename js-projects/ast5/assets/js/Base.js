
/**
 *
 *
 * @class Base
 */
class Base {
  /**
   *Creates an instance of Base.
   * @memberof Base
   */
  constructor() {
    this.x = 0;
    this.baseImage = new Image();
    this.baseImage.src = BASE_IMAGE;
    this.frameNumber = 0;
  }

  /**
   *
   *
   * @param {*} context
   * @param {*} dimension
   * @param {*} stop
   * @memberof Base
   */
  drawBase(context, dimension, stop) {
    this.frameNumber++;
    context.drawImage(this.baseImage, this.x, 400, 336, 112);
    if (this.frameNumber % 1 == 0 && !stop) this.x--;
    if (this.x < -48) this.x = 0;
  }
}
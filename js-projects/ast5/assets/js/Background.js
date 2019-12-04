
/**
 *
 *
 * @class BackGround
 */
class BackGround {
  
  /**
   *Creates an instance of BackGround.
   * @memberof BackGround
   */
  constructor() {
    let random = new Random();
    this.backgroundUrl = random.getBackgroundAndPipeColor().background;
    this.backGroundImage = new Image();
    this.backGroundImage.src = this.backgroundUrl;
  }

  /**
   *
   *
   * @param {*} context
   * @param {*} dimension
   * @memberof BackGround
   */
  drawBackground(context, dimension) {
    context.drawImage(this.backGroundImage, 0, 0, dimension.width, dimension.height);
  }
}
/**
 *
 *
 * @class Pipe
 */
class Pipe {
  /**
   *Creates an instance of Pipe.
   * @param {*} context
   * @param {*} dimension
   * @memberof Pipe
   */
  constructor(context, dimension) {
    let random = new Random();
    this.pipeUrl = random.getBackgroundAndPipeColor().pipe;
    this.pipeImage = new Image();
    this.pipeImage.src = this.pipeUrl;
    this.minTopPipeHeight = 60;
    this.minBottompPipeHeight = 60;
    this.y = Math.floor(Math.random() * (400 - this.minBottompPipeHeight - VERTICAL_GAP)) + this.minTopPipeHeight;
    this.x = undefined;
    this.frameNumber = 0;
    this.context = context;
    this.dimension = dimension;
    this.hasPassedBird = false;
    this.drawPipe();
  }

  /**
   *
   *
   * @param {*} stop
   * @memberof Pipe
   */
  drawPipe(stop) {
    this.frameNumber++;
    if (this.x === undefined)
      this.x = this.dimension.width;

    if (!stop)
      this.x--;

    this.drawUpPipe();
    this.drawDownPipe();
  }

  /**
   *
   *
   * @memberof Pipe
   */
  drawUpPipe() {
    this.context.save();
    this.context.translate(this.x, this.y)
    this.context.scale(1, -1);
    this.context.drawImage(this.pipeImage, 0, 0, 52, 320);
    this.context.restore();
  }

  /**
   *
   *
   * @memberof Pipe
   */
  drawDownPipe() {
    this.context.drawImage(this.pipeImage, this.x, this.y + VERTICAL_GAP, 52, 320);
  }

  /**
   *
   *
   * @returns
   * @memberof Pipe
   */
  getDimension() {
    return {
      x: this.x,
      width: 52,
      top: this.y,
      gap: VERTICAL_GAP,
    };
  }

  /**
   *
   *
   * @memberof Pipe
   */
  updatePassedBird() {
    this.hasPassedBird = true;
  }

  /**
   *
   *
   * @returns
   * @memberof Pipe
   */
  getPassedBird() {
    return this.hasPassedBird;
  }
}

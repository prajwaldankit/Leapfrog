/**
 *
 *
 * @class Bird
 */
class Bird {
  /**
   *Creates an instance of Bird.
   * @memberof Bird
   */
  constructor() {
    let random = new Random();
    this.bird = random.getRandomBird();
    this.birdImage = {
      upflap: new Image(),
      midflap: new Image(),
      downflap: new Image(),
    };

    this.birdImage.downflap.src = this.bird[0];
    this.birdImage.midflap.src = this.bird[1];
    this.birdImage.upflap.src = this.bird[2];

    this.birdHeight = 24;
    this.birdWidth = 34;

    this.falldown = false;

    this.x = 70;

    this.y = 220;

    this.velocity = 0;

    this.isFalling = true;
    this.hasFallen = false;

    this.boundryTop = 220;
    this.boundryBottom = 250;

    this.frame = 0;
    this.frameImage = this.birdImage.upflap;

    this.currentFrameNumber = 0;

    this.gravity = GRAVITY;
    this.upthrust = GRAVITY;

    this.deltaY = 50;
    this.prevY;
  }

  /**
   *
   *
   * @returns
   * @memberof Bird
   */
  getFallDownStatus() {
    return this.falldown;
  }

  /**
   *
   *
   * @param {*} falldown
   * @memberof Bird
   */
  setFallDownStatus(falldown) {
    this.falldown = falldown;
  }

  /**
   *
   *
   * @memberof Bird
   */
  fly() {
    this.falldown = true;
    this.isFalling = false;
    this.prevY = this.y;
  }

  /**
   *
   *
   * @param {*} context
   * @param {*} dimension
   * @param {*} stop
   * @memberof Bird
   */
  drawBird(context, dimension, stop) {
    if (this.falldown) {
      this.gravity = GRAVITY / 3;
      this.upthrust = GRAVITY / 2;
      this.setBoundries(-20, 400);
    } else {
      this.setBoundries(230, 260);
      this.velocity = GRAVITY;
    }

    this.drawIntoCanvas(context);

    this.changeRotateDeg();
    this.changePosition();
    this.changeFrame(stop);
  }

  /**
   *
   *
   * @param {*} context
   * @memberof Bird
   */
  drawIntoCanvas(context) {
    context.save();
    context.translate(this.x + (this.birdWidth / 2), this.y + (this.birdWidth / 2));
    context.drawImage(this.frameImage, -(this.birdWidth / 2), -(this.birdWidth / 2), this.birdWidth, this.birdHeight);
    context.restore();
  }

  /**
   *
   *
   * @returns
   * @memberof Bird
   */
  getDimensions() {
    return {
      x: this.x,
      y: this.y,
      width: this.birdWidth,
      height: this.birdHeight,
    };
  }

  /**
   *
   *
   * @memberof Bird
   */
  changeRotateDeg() {
    //make rotaion
  }

  /**
   *
   *
   * @memberof Bird
   */
  changePosition() {
    this.checkIfFalling();
    if (this.isFalling) {
      this.y += this.velocity;
      this.velocity += this.gravity;
    } else if (!this.isFalling) {
      this.y -= this.velocity;
      this.velocity += this.upthrust;

      if (this.prevY - this.y > this.deltaY) {
        this.isFalling = true;
        this.velocity = this.gravity;
      }
    }
  }

  /**
   *
   *
   * @memberof Bird
   */
  checkIfFalling() {
    var touched = this.touchedBoundries();
    if (touched != false) {
      if (touched === 1) {
        this.isFalling = false;
        if (this.falldown) {
          this.hasFallen = true;
          this.velocity = 0;
        }
      } else if (touched === -1) {
        this.isFalling = true;
        this.velocity = this.gravity;
      }
      if (!this.falldown) this.velocity = this.gravity;
    }
  }

  /**
   *
   *
   * @param {*} top
   * @param {*} bottom
   * @memberof Bird
   */
  setBoundries(top, bottom) {
    this.boundryTop = top;
    this.boundryBottom = bottom;
  }

  /**
   *
   *
   * @returns
   * @memberof Bird
   */
  touchedBoundries() {
    if (this.y <= this.boundryTop) return -1;
    if ((this.y + this.birdHeight) >= this.boundryBottom) return 1;
    return false;
  }

  /**
   *
   *
   * @param {*} stop
   * @memberof Bird
   */
  changeFrame(stop) {
    if (this.currentFrameNumber % 10 == 0 && !stop) {
      this.frame++;
      if (this.frame > 2) this.frame = 0;

      switch (this.frame) {
        case 0:
          this.frameImage = this.birdImage.upflap;
          break;
        case 1:
          this.frameImage = this.birdImage.midflap;
          break;
        case 2:
          this.frameImage = this.birdImage.downflap;
          break;

        default:
          this.frame = 0;
          this.frameImage = this.birdImage.upflap;
      }
    }
    this.currentFrameNumber++;
  }
}
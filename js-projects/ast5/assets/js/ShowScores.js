/**
 *
 *
 * @class ScoreDisplay
 */
class ScoreDisplay {
  /**
   *Creates an instance of ScoreDisplay.
   * @param {*} context
   * @param {*} dimension
   * @memberof ScoreDisplay
   */
  constructor(context, dimension) {
    this.score = 0;
    this.canvasDimension = dimension;
    this.context = context;

    this.highScore = new HighScore();

    this.images = [];
    NUMBERS.forEach((number) => {
      let single = new Image();
      single.src = number;
      this.images.push(single);
    })
  }

  /**
   *
   *
   * @returns
   * @memberof ScoreDisplay
   */
  getDisplayWidth() {
    let width = 0;
    this.score.toString().split('').map(Number).forEach((digit) => {
      if (digit === 1)
        width += 16;
      else
        width += 24;
    });
    return this.score.toString().length * 24;
  }

  /**
   *
   *
   * @param {*} images
   * @returns
   * @memberof ScoreDisplay
   */
  preloadImages(images) {
    let tempImages = [];
    images.forEach((image) => {
      let temp = new Image();
      temp.src = image;
      temp.onload = () => {
        tempImages.push(temp);
      }
    });
    return tempImages;
  }

  /**
   *
   *
   * @param {*} gameOver
   * @memberof ScoreDisplay
   */
  display(gameOver) {
    // for game over 
  }

  /**
   *
   *
   * @param {*} number
   * @memberof ScoreDisplay
   */
  drawDigits(number) {
    let digits = number.toString().split('').map(Number);
    digits.forEach((digit) => {
      this.context.drawImage(this.images[digit], this.x, this.y, ((digit === 1) ? 16 : 24), 36);
      this.x += (digit === 1) ? 16 : 24;
    });
  }

  /**
   *
   *
   * @param {*} newScore
   * @memberof ScoreDisplay
   */
  updateScore(newScore) {
    this.score = newScore;
    this.highScore.setIfHighest(this.score);
    this.display();
  }

  /**
   *
   *
   * @param {*} x
   * @param {*} y
   * @param {*} width
   * @param {*} height
   * @memberof ScoreDisplay
   */
  roundRect(x, y, width, height) {
    // make the button here
  }

  /**
   *
   *
   * @memberof ScoreDisplay
   */
  drawButton() {
    // make buttons here
  }
}
/**
 *
 *
 * @class ShowScores
 */
class ShowScores {
  /**
   *Creates an instance of ShowScores.
   * @param {*} context
   * @param {*} dimension
   * @memberof ShowScores
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
   * @param {*} images
   * @returns
   * @memberof ShowScores
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
   * @memberof ShowScores
   */
  display(gameOver) {
    // for game over 
  }

  /**
   *
   *
   * @param {*} number
   * @memberof ShowScores
   */
  drawDigits(number) {
    // for socres/
  }

  /**
   *
   *
   * @param {*} newScore
   * @memberof ShowScores
   */
  updateScore(newScore) {
    this.score = newScore;
    this.highScore.setHighScore(this.score);
    this.display();
  }

  /**
   *
   *
   * @param {*} x
   * @param {*} y
   * @param {*} width
   * @param {*} height
   * @memberof ShowScores
   */
  roundRect(x, y, width, height) {
    // make the button here
  }

  /**
   *
   *
   * @memberof ShowScores
   */
  drawButton() {
    // make buttons here
  }
}
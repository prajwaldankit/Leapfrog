/**
 *
 *
 * @class HighScore
 */
class HighScore {
  /**
   *Creates an instance of HighScore.
   * @memberof HighScore
   */
  constructor() {

  }

  /**
   *
   *
   * @param {*} score
   * @memberof HighScore
   */
  setHighScore(score) {
    if (score > this.getHighScore()) {
      localStorage.setItem("highScore", score);
    }
  }

  /**
   *
   *
   * @returns
   * @memberof HighScore
   */
  getHighScore() {
    return parseInt((localStorage.getItem("highScore") === null) ? 0 : localStorage.getItem("highScore"));
  }
}
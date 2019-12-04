/**
 *
 *
 * @class Random
 */
class Random {
  constructor() {

  }

  /**
   *
   *
   * @memberof Random
   */
  getRandom = (min, max) => Math.round(Math.floor(Math.random() * (max - min) + min));

  /**
   *
   *
   * @memberof Random
   */
  getBackgroundAndPipeColor = () => {
    let randomTime = this.getRandom(0, TIME_OF_GAME.length);
    let backgroundUrl = BACKGROUND_IMAGES[TIME_OF_GAME[randomTime]];
    let pipeUrl = PIPE_IMAGES[PIPE_COLOR[randomTime]];
    return {
      background: backgroundUrl,
      pipe: pipeUrl
    };
  }

  /**
   *
   *
   * @memberof Random
   */
  getRandomBird = () => {
    let birdIndex = this.getRandom(0, BIRD_COLOR.length - 1);
    let birdColor = BIRD_COLOR[birdIndex];
    return BIRDS_IMAGES[birdColor];
  }

  /**
   *
   *
   * @memberof Random
   */
  getRandomPipePosition = (min, max) => {
    let pipePosition = this.getRandom(min, max);
    return pipePosition;
  }
}

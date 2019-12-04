const allImages = [
  'assets/images/0.png',
  'assets/images/1.png',
  'assets/images/2.png',
  'assets/images/3.png',
  'assets/images/4.png',
  'assets/images/5.png',
  'assets/images/6.png',
  'assets/images/7.png',
  'assets/images/8.png',
  'assets/images/9.png',

  'assets/images/redbird-upflap.png',
  'assets/images/redbird-midflap.png',
  'assets/images/redbird-downflap.png',

  'assets/images/bluebird-upflap.png',
  'assets/images/bluebird-midflap.png',
  'assets/images/bluebird-downflap.png',

  'assets/images/yellowbird-upflap.png',
  'assets/images/yellowbird-midflap.png',
  'assets/images/yellowbird-downflap.png',

  'assets/images/background-day.png',
  'assets/images/background-night.png',

  'assets/images/pipe-green.png',
  'assets/images/pipe-red.png',

  'assets/images/base.png',
  'assets/images/gameover.png',
  'assets/images/message.png',
];

/**
 *
 *
 * @class Initializer
 */
class Initializer {
  /**
   *Creates an instance of Initializer.
   * @memberof Initializer
   */
  constructor() {
    this.totalImages = allImages.length;
    this.loadedImages = 0;
  }

  /**
   *
   *
   * @param {*} callback
   * @param {*} that
   * @memberof Initializer
   */
  load(callback, that) {
    allImages.forEach((image) => {
      var img = new Image();
      img.src = image;
      img.onload = () => {
        this.loadedImages++;
        if (this.loadedImages >= this.totalImages) {
          callback(that);
        }
      }
    });
  }
}
/**
 * width and height for the game container
 */
const GAME_WIDTH = 288;
const GAME_HEIGHT = 512;
const BASE_HEIGHT = 112;
const PIPE_WIDTH = 52;
const GAP = 60;
const PIPE_IMAGES = {
  red : 'assets/images/pipe-red.png',
  green : 'assets/images/pipe-green.png',
}
const BIRDS_IMAGES = {
  red: [
    'assets/images/redbird-downflap.png',
    'assets/images/redbird-midflap.png',
    'assets/images/redbird-upflap.png',
  ],
  blue: [
    'assets/images/bluebird-downflap.png',
    'assets/images/bluebird-midflap.png',
    'assets/images/bluebird-upflap.png',
  ],
  yellow: [
    'assets/images/yellowbird-downflap.png',
    'assets/images/yellowbird-midflap.png',
    'assets/images/yellowbird-upflap.png',
  ]
};
const BACKGROUND_IMAGES = {
  day: 'assets/images/background-day.png',
  night: 'assets/images/background-night.png',
};
const GAMEOVER_IMAGE = 'assets/images/gameover.png';
const MESSAGE_IMAGE = 'assets/images/message.png';
const BASE_IMAGE = 'assets/images/base.png';
const gameContainers = document.getElementsByClassName('game-container');
const gameBase = document.getElementsByClassName('game-base');




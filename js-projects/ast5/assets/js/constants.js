/**
 * width and height for the game container
 */
const GAME_WIDTH = 288;
const GAME_HEIGHT = 512;
const BASE_HEIGHT = 112;
const PIPE_WIDTH = 52;
const VERTICAL_GAP = 80;
const HORIZONTAL_GAP = 250;
const GRAVITY = 0.1;
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
const NUMBERS = [
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
];
const BIRD_COLOR = Object.keys(BIRDS_IMAGES);
const BACKGROUND_IMAGES = {
  day: 'assets/images/background-day.png',
  night: 'assets/images/background-night.png',
};
const PIPE_IMAGES = {
  green: 'assets/images/pipe-green.png',
  red: 'assets/images/pipe-red.png',
}
const TIME_OF_GAME = Object.keys(BACKGROUND_IMAGES);
const PIPE_COLOR = Object.keys(PIPE_IMAGES);
const GAMEOVER_IMAGE = 'assets/images/gameover.png';
const MESSAGE_IMAGE = 'assets/images/message.png';
const BASE_IMAGE = 'assets/images/base.png';
const GAME_OVER = 'assets/images/gameover.png';
const GAME_START = 'assets/images/message.png';


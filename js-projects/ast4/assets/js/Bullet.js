function Bullet(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.life = this.game.options.bulletLife || BULLET_LIFE;
  this.speed = this.game.options.bulletSpeed || BULLET_SPEED;
}
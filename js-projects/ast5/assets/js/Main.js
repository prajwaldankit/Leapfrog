/**
 *
 *
 * @class Games
 */
class Games{
  /**
   *Creates an instance of Games.
   * @param {*} selector
   * @memberof Games
   */
  constructor (selector) {
    let container = document.getElementsByClassName(selector);
    for (let i = 0; i < container.length; i++) {
      new Game(container[i]);
    }
  }
}
new Games('game-container');

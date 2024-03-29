/**
 *
 *
 * @class Game
 */
class Game {
  /**
   *Creates an instance of Game.
   * @param {*} parent
   * @memberof Game
   */
  constructor(parent) {
    this.element = undefined;
    this.parent = parent;
    this.context = undefined;
    this.bird = undefined;
    this.background = undefined;
    this.scoreDisplay = undefined;
    this.base = undefined;
    this.pipes = [];
    this.gameStatus = "gamestart";
    this.frameNumber = 0;
    this.initCanvas();
    this.loadImages();
    this.score = 0;
    this.gameOverDueToCollide = false;
  }

  /**
   *
   *
   * @memberof Game
   */
  loadImages() {
    var initializer = new Initializer();
    initializer.load(this.start, this);
  }

  /**
   *
   *
   * @param {*} self
   * @memberof Game
   */
  start(self) {
    self.initBackground();
    self.initBird();
    self.initBase();
    self.initShowScores(self.context, self.getCanvasDimension());
    self.intervalRef = setInterval(() => { self.startGame() }, 10);
  }
  /**
   *
   *
   * @memberof Game
   */
  startGame() {
    this.frameNumber++;
    let stop = (this.gameStatus === "gameover") ? true : false;

    this.clearCanvas();
    this.createBackground();


    if (this.gameStatus == "playing" && this.frameNumber % HORIZONTAL_GAP == 0)
      this.pipes.push(new Pipe(this.context, this.getCanvasDimension()));

    this.updatePipes(stop);
    this.createBird(stop);

    if (this.bird.hasFallen) {
      this.gameStatus = "gameover";
      if (!this.gameOverDueToCollide) {
        this.gameOverDueToCollide = true;
      }
    }

    if (this.gameStatus != "gamestart")
      this.displayScore();

    this.displayMessage();
    this.createBase(stop);
  }

  /**
   *
   *
   * @memberof Game
   */
  restartGame() {
    this.score = 0;
    this.scoreDisplay.updateScore(this.score);
    this.frameNumber = 0;
    this.initBird();
    this.pipes = [];
    this.gameStatus = "gamestart";
    this.startGame();
    this.gameOverDueToCollide = false;
  }

  /**
   *
   *
   * @param {*} stop
   * @memberof Game
   */
  updatePipes(pos) {
    let birdDimension = this.bird.getDimensions();
    if (this.pipes.length > 0) {
      this.pipes.forEach((pipe) => {
        pipe.drawPipe(pos);
        if (this.gameStatus == "playing") {
          let pipeDimension = pipe.getDimension();
          if ((birdDimension.x >= pipeDimension.x && birdDimension.x <= pipeDimension.x + pipeDimension.width) || (birdDimension.x + birdDimension.width >= pipeDimension.x && birdDimension.x + birdDimension.width <= pipeDimension.x + pipeDimension.width)) {
            if (birdDimension.y < pipeDimension.top || birdDimension.y + birdDimension.height < pipeDimension.top || birdDimension.y > pipeDimension.top + pipeDimension.gap || birdDimension.y + birdDimension.height > pipeDimension.top + pipeDimension.gap) {
              this.gameOverDueToCollide = true;
              this.gameStatus = "gameover";
            }
          }

          if (this.gameStatus === "playing" && (birdDimension.x >= pipeDimension.x + pipeDimension.width)) {
            if (!pipe.getPassedBird()) {
              this.score++;
              console.log(this.score);
              // scoreElement.innerHTML = `${this.score}`;
              pipe.updatePassedBird();
            }
          }

          if (pipeDimension.y + pipeDimension.width < 0) {
            this.pipes.splice(this.pipes.indexOf(pipe), 1);
          }
        }
      });
    }
  }

  /**
   *
   *
   * @memberof Game
   */
  initCanvas() {
    this.element = document.createElement('canvas');
    this.element.height = GAME_HEIGHT;
    this.element.width = GAME_WIDTH;
    this.context = this.element.getContext('2d')
    this.parent.appendChild(this.element);

    this.element.onclick = (e) => {
      this.canvasClicked(e);
    }
  }
  /**
   *
   *
   * @param {*} e
   * @memberof Game
   */
  canvasClicked(e) {
    if (this.gameStatus == "gamestart") {
      this.bird.setFallDownStatus(true);
      console.log('game starting');
      this.gameStatus = "playing";
    }
    if (this.gameStatus === "playing") {
      console.log('game playing');
      this.bird.fly();
    }
    if (this.gameStatus === "gameover") {
      console.log('game over');
      this.restartGame();
      this.gameStatus = "gamestart";
    }
  }


  /**
   *
   *
   * @memberof Game
   */
  initBase() {
    this.base = new Base();
  }

  /**
   *
   *
   * @param {*} stop
   * @memberof Game
   */
  createBase(stop) {
    this.base.drawBase(this.context, this.getCanvasDimension(), stop);
  }

  /**
   *
   *
   * @returns
   * @memberof Game
   */
  getCanvasDimension() {
    return { width: this.element.width, height: this.element.height };
  }

  /**
   *
   *
   * @memberof Game
   */
  initBackground() {
    this.background = new BackGround();
  }

  /**
   *
   *
   * @memberof Game
   */
  createBackground() {
    this.background.drawBackground(this.context, this.getCanvasDimension());
  }

  /**
   *
   *
   * @memberof Game
   */
  initBird() {
    this.bird = new Bird();
  }

  /**
   *
   *
   * @param {*} stop
   * @memberof Game
   */
  createBird(stop) {
    this.bird.drawBird(this.context, this.getCanvasDimension(), stop);
  }

  /**
   *
   *
   * @memberof Game
   */
  initShowScores() {
    this.scoreDisplay = new ShowScores(this.context, this.getCanvasDimension());
  }

  /**
   *
   *
   * @memberof Game
   */
  displayScore() {
    this.scoreDisplay.display((this.gameStatus === "gameover") ? true : false);
  }

  /**
   *
   *
   * @memberof Game
   */
  displayMessage() {
    var img = new Image();
    if (this.gameStatus == "gamestart") {
      img.src = GAME_START;

    } else if (this.gameStatus == "playing") {

    } else if (this.gameStatus === "gameover") {
      img.src = GAME_OVER;
    }
  }

  /**
   *
   *
   * @memberof Game
   */
  clearCanvas() {
    this.context.clearRect(0, 0, this.getCanvasDimension().width, this.getCanvasDimension().height);
  }
}

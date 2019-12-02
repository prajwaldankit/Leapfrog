function GameAnimation(fps, parentElement) {
  var obstacleCars = [];
  var userCar = null;
  var carCollision = false;
  var currentLane = 1;
  var score = 0;
  var objectGenerationRate = CAR_HEIGHT * 3 + 20;
  var distanceTravelled = 0;
  var highScore = localStorage.getItem("highScore") || 0;
  var longestDistanceTravelled = localStorage.getItem("longestDistanceTravelled") || 0;

  fps = fps || GAME_ANIMATION_SPEED_FPS;
  var start = 0,
    frameDuration = 1000 / fps;
  var animationFrameVariable = 0;
  var speedIntervalVariable = 0;
  var gameSpeed = gameSpeed || GAME_SPEED;

  this.init = function () {
    this.gameReset();
    this.generateUserCar();
    this.gameStart();
  };

  this.gameReset = function () {
    obstacleCars = [];
    userCar = null;
    carCollision = false;
    currentLane = 1;
    score = 0;
    objectGenerationRate = CAR_HEIGHT * 3 + 20;
    distanceTravelled = 0;
    highScore = localStorage.getItem("highScore") || 0;
    longestDistanceTravelled = localStorage.getItem("longestDistanceTravelled") || 0;
    gameSpeed = GAME_SPEED;
    
    var playRestartElement = parentElement.firstElementChild;
    
    parentElement.innerHTML = '';
    parentElement.appendChild(playRestartElement);

    document.getElementById("highscore").innerHTML = '';
    document.getElementById("longestdistance").innerHTML = '';
  };

  this.generateUserCar = function () {
    var xAxis = ROAD_LANES_VALUES[currentLane];
    var yAxis = CONTAINER_HEIGHT - CAR_HEIGHT - 10;
    userCar = new Car(xAxis, yAxis, parentElement);

    userCar.init('./assets/images/myCar.png');
    userCar.draw();
  };

  this.gameStart = function () {
    speedIntervalVariable = setInterval(function () {
      gameSpeed += 0.1;
    }, 1000);

    setTimeout(function () {
      var carObstacle = generateObstacle(parentElement);
      obstacleCars.push(carObstacle);
    }, 1200);

    animationFrameVariable = window.requestAnimationFrame(this.animate.bind(this));
  };

  this.animate = function (timestamp) {
    if (!carCollision) {
      if (timestamp >= start) {
        this.createObstacles();
        this.moveBackgroundImageAndObstacles();
        displayScoreAndInfo(highScore, longestDistanceTravelled, score, distanceTravelled, gameSpeed);

        start = timestamp + frameDuration;
      }
      animationFrameVariable = window.requestAnimationFrame(this.animate.bind(this));
    }
    if (carCollision) {
      window.cancelAnimationFrame(animationFrameVariable);
      clearInterval(speedIntervalVariable);

      setHighScoreIfHighest(highScore, score, longestDistanceTravelled, distanceTravelled);

      pauseRestartButton.parentNode.style.display = 'block';
      pauseRestartButton.innerHTML = 'Restart';
    }
  };

  this.createObstacles = function () {
    if (obstacleCars.length != 0) {
      var lastCar = obstacleCars[obstacleCars.length - 1];
      if (lastCar.y > objectGenerationRate) {
        var carObstacle = generateObstacle(parentElement);
        obstacleCars.push(carObstacle);
      }
    }

    if (distanceTravelled > 5000) {
      objectGenerationRate = CAR_HEIGHT * 2 + 20;
    }
  }

  this.moveBackgroundImageAndObstacles = function () {
    distanceTravelled += gameSpeed;
    parentElement.style.backgroundPositionY = distanceTravelled + 'px';

    var isCarOutOfBoundary = false;
    for (var i = 0; i < obstacleCars.length; i++) {
      obstacleCars[i].y += gameSpeed;
      obstacleCars[i].draw();

      if (userCar.getCarLeft() < obstacleCars[i].getCarRight() &&
        userCar.getCarRight() > obstacleCars[i].getCarLeft() &&
        (userCar.getCarTop() + 10) < obstacleCars[i].getCarBottom() &&
        userCar.getCarBottom() - 10 > obstacleCars[i].getCarTop()) {
        carCollision = true;
      }

      if (obstacleCars[i].y > CONTAINER_HEIGHT) {
        obstacleCars[i].clearCar();
        isCarOutOfBoundary = true;
        score += 1;
      }
    }

    if (isCarOutOfBoundary) {
      obstacleCars = obstacleCars.filter(function (obstacle) {
        return !obstacle.carRemoved;
      });
    }
  };

  this.moveCar = function (event) {
    if (!carCollision) {
      if (event.code == "KeyA" || event.code == "ArrowLeft") {
        if (currentLane > 0) {
          if (userCar.x <= ROAD_LANES_VALUES[currentLane]) {
            currentLane--;
            userCar.x = ROAD_LANES_VALUES[currentLane];
            userCar.draw();
          }
        }
      }
      if (event.code == "KeyD" || event.code == "ArrowRight") {
        if (currentLane < (ROAD_LANES_VALUES.length - 1)) {
          if (userCar.x <= ROAD_LANES_VALUES[currentLane]) {
            currentLane++;
            userCar.x = ROAD_LANES_VALUES[currentLane];
            userCar.draw();
          }
        }
      }
    }
  };
}
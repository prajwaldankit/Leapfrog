function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateObstacle(parentElement) {
  var obstacleImagePosition = getRandom(0, (OBSTACLES.length - 1));
  var obstacleImage = OBSTACLES[obstacleImagePosition];
  var lane = getRandom(0, ROAD_LANES_VALUES.length - 1);

  var car = new Car(ROAD_LANES_VALUES[lane], 0, parentElement);
  car.init(obstacleImage);
  car.draw();
  return car;
}

function displayScoreAndInfo(highScore, highestDistance, score, distanceTravelled, gameSpeed) {
  highScore = Math.floor(highScore);
  highestDistance = Math.floor(highestDistance);
  distanceTravelled = Math.floor(distanceTravelled);
  speed = Math.round(gameSpeed * 100);

  document.getElementById("highScore").innerHTML = highScore;
  document.getElementById("highestDistance").innerHTML = highestDistance;
  document.getElementById("score").innerHTML = score;
  document.getElementById("distanceTravelled").innerHTML = distanceTravelled;
  document.getElementById("speed").innerHTML = speed;
}

function setHighScoreIfHighest(highScore, userScore, highestDistance, distanceTravelled) {
  if (userScore > highScore) {
    localStorage.setItem("highScore", userScore);
    document.getElementById("highscore").innerHTML = 'Congratulations You have Got High Score';
  }

  if (distanceTravelled > highestDistance) {
    localStorage.setItem("highestDistance", distanceTravelled);
    document.getElementById("longestdistance").innerHTML = 'Congratulations You have Travelled Longest Distance';
  }
}

function playRestart() {
  startRestartBtn.parentNode.style.display = 'none';
  gameAnimation.init();
}
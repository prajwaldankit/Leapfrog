var MAX_HEIGHT = 800;
var MAX_WIDTH = 1000;
var MIN_SPEED = 2;
var MAX_SPEED = 2;
var MIN_BOX_SIZE = 45;
var MAX_BOX_SIZE = 45;
// class to create box container

function BoxContainer(rootElement, boxCount) {
  var boxes = [];
  this.rootElement = rootElement;
  this.container = document.createElement('div');
  this.boxCount = boxCount;

  var that = this;

  this.init = function () {
    this.createContainer();
    this.applyStyle();
    this.createBoxes();
  }

  this.createContainer = function () {
    this.container.setAttribute('id', 'app-container');
    this.rootElement.appendChild(this.container);
  }

  this.applyStyle = function () {
    this.container.style.width = MAX_WIDTH + 'px';
    this.container.style.height = MAX_HEIGHT + 'px';
    this.container.style.position = 'relative';
    this.container.style.margin = '30px auto';
    this.container.style.backgroundColor = 'yellow';
    this.container.style.border = '1px solid black';
  }

  this.createBoxes = function () {
    var i = 0;

    while (i < this.boxCount) {
      var box = new Box(this.container).init();
      box.setPosition(
        this.getStartingPosition(box).xPosition,
        this.getStartingPosition(box).yPosition
      );
      // console.log('checking', i)
      var checkingPosition = this.checkCollisionForInitialPosition(box);
      if (!checkingPosition) {
        // console.log('accepted', i);

        boxes.push(box);
        i++;
      }
    }
    boxes.forEach(function (box) {
      box.speedX = getRandomArbitrary(MIN_SPEED, MAX_SPEED);
      box.speedY = getRandomArbitrary(MIN_SPEED, MAX_SPEED);
      box.draw();
    })

    setInterval(function () {
      that.moveBoxes();
    }, 100)
  }

  this.moveBoxes = function () {
    for (var i = 0; i < this.boxCount; i++) {
      boxes[i].move();
      this.checkBoundary(boxes[i]);
      this.checkCollisionWithOtherObjects(boxes[i]);
      boxes[i].draw();
    }
  }

  this.checkBoundary = function (box) {
    if ((box.x <= 0 || box.y <= 0) || (box.x + box.width >= MAX_WIDTH || box.y + box.height >= MAX_HEIGHT)) {
      this.changeDirectionAfterBoundary(box);
    }
  }

  this.checkCollisionForInitialPosition = function (box) {
    for (var i = 0; i < boxes.length; i++) {
      if ((box.getLeft() < boxes[i].getRight() &&
        box.getRight() > boxes[i].getLeft() &&
        box.getTop() < boxes[i].getBottom())) {
        console.log('collision detected in initialization');
        return true;
      } else {
        // console.log('here')
        return false;
      }
    }
  }

  this.checkCollisionWithOtherObjects = function (box) {
    var currentIndex = boxes.indexOf(box);
    for (var i = 0; i < boxes.length; i++) {
      if (currentIndex != i) {
        if (box.getLeft() < boxes[i].getRight() &&
          box.getRight() > boxes[i].getLeft() &&
          box.getTop() < boxes[i].getBottom() &&
          box.getBottom() > boxes[i].getTop()) {
          this.changeDirectionsAfterObject(box, boxes[i]);
        }
      }
    }
  }

  this.changeDirectionsAfterObject = function (box1, box2) {
    if (box1.x > box2.x) {
      box1.toRight = true;
      box2.toRight = false;
    }
    else {
      box1.toRight = false;
      box2.toRight = true;
    }

    if (box1.y > box2.y) {
      box1.toBottom = true;
      box2.toBottom = false;
    }
    else {
      box1.toBottom = false;
      box2.toBottom = true;
    }
  }

  this.changeDirectionAfterBoundary = function (box) {
    if (box.getLeft() <= 0) box.toRight = true;
    if (box.getRight() >= MAX_WIDTH) box.toRight = false;
    if (box.getTop() <= 0) box.toBottom = true;
    if (box.getBottom() >= MAX_HEIGHT) box.toBottom = false;

  }

  this.getStartingPosition = function (box) {
    return {
      xPosition: getRandomArbitrary(0, MAX_WIDTH - box.width),
      yPosition: getRandomArbitrary(0, MAX_HEIGHT - box.height)
    }
  }
}

// class to create individual boxes

function Box(container) {

  this.container = container;
  this.x = 10;
  this.y = 10;
  this.speedX = 1;
  this.speedY = 1;
  this.width = getRandomArbitrary(MIN_BOX_SIZE, MAX_BOX_SIZE);
  this.height = this.width;
  this.toRight = getRandomBool();
  this.toBottom = getRandomBool();
  var that = this;

  this.init = function () {
    this.createBox();
    this.applyStyle();
    // this.draw();
    return this;
  }

  this.createBox = function () {
    var box = document.createElement('div');
    this.element = box;
  }

  this.applyStyle = function () {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.position = 'absolute';
    this.element.style.backgroundColor = 'black';
    this.element.addEventListener('click', function() {
      that.element.style.backgroundColor = 'green';
    })
  }

  this.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.container.appendChild(this.element);
  }

  this.move = function () {
    if (this.toRight && this.toBottom) {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    if (!this.toRight && !this.toBottom) {
      this.x -= this.speedX;
      this.y -= this.speedY;
    }
    if (this.toRight && !this.toBottom) {
      this.x += this.speedX;
      this.y -= this.speedY;
    }
    if (!this.toRight && this.toBottom) {
      this.x -= this.speedX;
      this.y += this.speedY;
    }
    this.draw();
  }

  this.getLeft = function () { return this.x }
  this.getRight = function () { return this.x + this.width }
  this.getTop = function () { return this.y }
  this.getBottom = function () { return this.y + this.height }

}

// Game class

function Game(rootElement, boxCount) {
  this.boxCount = boxCount;
  this.startGame = function () {
    new BoxContainer(rootElement, this.boxCount).init();
  }
}

// function to generate random numberes 

function getRandomArbitrary(min, max) {
  value = (Math.random() * (max - min)) + min;
  return value;
}

// function to generate random color

function getRandomColor() {
  return 'rgb(' + getRandomArbitrary(0, 255) + ',' + getRandomArbitrary(0, 255) + ',' + getRandomArbitrary(0, 255) + ')';
}

function getRandomBool() {
  return getRandomArbitrary(0, 1) >= 0.5;
}

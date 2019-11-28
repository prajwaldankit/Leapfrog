var MAX_HEIGHT = 800;
var MAX_WIDTH = 1000;

function BoxContainer(rootElement, boxCount) {

  this.rootElement = rootElement;
  this.boxCount = boxCount;
  this.container = document.createElement('div');
  
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
    this.container.style.backgroundColor = '#999999';
    this.container.style.border = '1px solid black';
  }

  this.createBoxes = function () {
    for (var i = 0; i < this.boxCount; i++) {
      new Box(this.container).init();
    }
  }
}

function Box(container) {

  var box = document.createElement('div');
  this.container = container;
  this.element = box;
  this.x = 10;
  this.y = 10;
  this.speedX = 1;
  this.speedY = 1;
  this.width = 20;
  this.height = 20;

  this.init = function () {
    this.createBox();
    this.applyStyle();
    this.draw();
  }

  this.createBox = function () {
    this.container.appendChild(box);
  }

  this.applyStyle = function () {
    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = 'red';
  }

  this.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  this.move = function () {

  }
}

function Game(rootElement, boxCount) {
  this.boxCount = boxCount;
  this.startGame = function () {
    new BoxContainer(rootElement,this.boxCount).init();
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
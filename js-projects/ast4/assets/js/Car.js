function Car(x, y, parentElement) {
  this.x = x;
  this.y = y;

  this.carElement = null;
  this.carRemoved = false;

  var that = this;
  this.clearCar = function () {
      that.carElement.remove();
      that.carRemoved = true;
  };

  this.init = function (carImage) {
      this.carElement = document.createElement('div');

      this.carElement.style.backgroundImage = 'url(' + carImage + ')';
      this.carElement.style.backgroundRepeat = 'no-repeat';
      this.carElement.style.backgroundPosition = 'center';
      this.carElement.style.backgroundSize = '100% 100%';

      this.carElement.style.height = CAR_HEIGHT + 'px';
      this.carElement.style.width = CAR_WIDTH + 'px';
      this.carElement.style.position = 'absolute';

      parentElement && parentElement.appendChild(this.carElement);
  };

  this.draw = function () {
      this.carElement.style.top = this.y + 'px';
      this.carElement.style.left = this.x + 'px';
  };

 
  this.move = function (xSpeed, ySpeed) {
      this.y = this.y + ySpeed;
      this.x = this.x + xSpeed;
      this.draw();
  };

  this.moveUserCar = function (position) {
      this.x = position;
      this.draw();
  };

  this.getCarTop = function () { return this.y; };
  this.getCarBottom = function () { return this.y + CAR_HEIGHT; };
  this.getCarLeft = function () { return this.x; };
  this.getCarRight = function () { return this.x + CAR_WIDTH; };
}
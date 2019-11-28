function Carousel(carouselContainer) {
  this.container = carouselContainer;
  this.wrapper = this.container.getElementsByClassName('carousel-image-wrapper')[0];
  this.totalImages = this.wrapper.getElementsByTagName('img').length;
  this.currentImageIndex = 1;
  this.currentImagePosition = 0;

  var that = this;

  this.init = function (width, height) {
    this.imageHeight = height;
    this.imageWidth = width;
    this.applyStyle();
    this.drawIndicators();
    this.drawNavigationButtons();
  };

  this.applyStyle = function () {
    this.container.style.width = this.imageWidth + 'px';
    this.container.style.height = this.imageHeight + 'px';
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.margin = '30px auto';
    this.container.style.boxShadow = '0px 0px 8px #444';

    this.wrapper.style.width = this.totalImages * this.imageWidth + 'px';
    this.wrapper.style.height = this.imageHeight + 'px';
    this.wrapper.style.position = 'absolute';
    this.wrapper.style.left = '0px';
  }

  this.updateImagePosition = function (position) {
    this.wrapper.style.left = position + 'px';
  }

  this.drawNavigationButtons = function () {
    var prevButton = document.createElement('div');
    prevButton.style.display = 'inline-block';
    prevButton.style.position = 'absolute';
    prevButton.style.zIndex = '30';
    prevButton.style.left = '0px';
    prevButton.style.top = '50%';
    prevButton.style.width = '64px';
    prevButton.style.height = '64px';
    prevButton.style.backgroundImage = 'url("images/navigation/prev.png")';
    prevButton.style.backgroundSize = 'contain';

    var nextButton = document.createElement('div');
    nextButton.style.display = 'inline-block';
    nextButton.style.position = 'absolute';
    nextButton.style.zIndex = '30';
    nextButton.style.right = '0px';
    nextButton.style.top = '50%';
    nextButton.style.width = '64px';
    nextButton.style.height = '64px';
    nextButton.style.backgroundImage = 'url("images/navigation/next.png")';
    nextButton.style.backgroundSize = 'contain';

    nextButton.addEventListener('click', function () { that.nextImage() });
    prevButton.addEventListener('click', function () { that.prevImage() });

    this.container.appendChild(prevButton);
    this.container.appendChild(nextButton);
  }

  this.drawIndicators = function () {
    var indicators = document.createElement('div');
    indicators.style.position = 'absolute';
    indicators.style.height = '20px';
    indicators.style.width = '100%';
    indicators.style.bottom = '10px';
    indicators.style.textAlign = 'center';
    var ul = document.createElement('ul')

    for (var i = 1; i <= this.totalImages; i++) {
      var li = document.createElement('li');
      li.style.height = '10px';
      li.style.width = '10px';
      li.style.borderRadius = '100%';
      li.style.border = '2px solid white';
      li.style.display = 'inline-block';
      li.style.margin = '0px 5px';
      li.addEventListener(
        "click",
        (function (imageIndex) {
          return function () {
            that.goToImage(imageIndex);
          };
        })(i)
      );
      ul.appendChild(li);
    }

    indicators.appendChild(ul);
    this.container.appendChild(indicators);
  }

  this.goToImage = function (newImageIndex) {
    // this.resetAutoSlider();
    var initialPosition = (1 - this.currentImageIndex) * this.imageWidth;

    this.currentImageIndex = ((newImageIndex > this.totalImages) ? 1 : ((newImageIndex <= 0) ? this.totalImages : newImageIndex));

    var finalPosition = (1 - this.currentImageIndex) * this.imageWidth;
    console.log(initialPosition, finalPosition);
    var tempPosition = initialPosition;
    var speedOfSliding = (initialPosition - finalPosition) / 100;

    var slideAnimation = setInterval(function () {
      if(speedOfSliding == 0) clearInterval(slideAnimation);
      that.resetAutoSlider();
      if (finalPosition > initialPosition) {
        tempPosition -= speedOfSliding;
        if (finalPosition < tempPosition) {
          clearInterval(slideAnimation);
          that.updateImagePosition(finalPosition);
          return;
        }
      } else {
        tempPosition -= speedOfSliding;
        if (finalPosition > tempPosition) {
          clearInterval(slideAnimation);
          that.updateImagePosition(finalPosition);
          return;
        }
      }
      that.updateImagePosition(tempPosition);
    }, 1)

  }

  this.nextImage = function () {
    this.goToImage(this.currentImageIndex + 1)
  }

  this.prevImage = function () {
    this.goToImage(this.currentImageIndex - 1)
  }

  this.autoSlider = setInterval(function () {
    that.nextImage()
  }, 2000)

  this.resetAutoSlider = function () {
    clearInterval(this.autoSlider);
    this.autoSlider = setInterval(function () {
      that.nextImage()
    }, 2000)
  }
}

var carouselContainers = document.getElementsByClassName('carousel-container');
// console.log(carouselContainers);
// var carouselContainers = document.querySelectorAll('.carousel-container');
console.log(carouselContainers);

Array.prototype.forEach.call(carouselContainers, function (carouselContainer) {
  // carouselContainer.getElementsByClassName('carousel-image-wrapper')[0].style.width = '2700px';
  carouselContainer.getElementsByClassName('carousel-image-wrapper')[0].style.left = '-1280px';
  carouselContainer = new Carousel(carouselContainer).init(720,1280);
  carouselContainer = new Carousel(carouselContainer).init(720,1280);
});

// var carouselImageWrappers = document.getElementsByClassName('carousel-image-wrapper');
// var imageArray = carouselImageWrapper.getElementsByTagName('IMG')

function Carousel(carouselContainer) {
  this.container = carouselContainer;
  this.wrapper = this.container.getElementsByClassName('carousel-image-wrapper')[0];
  this.totalImages = this.wrapper.getElementsByTagName('img').length;

  this.init = function (height, width) {
    this.imageHeight = height;
    this.imageWidth = width;
    this.applyStyle();
    this.drawNavigationButtons();
    // this.drawIndicators();
  };

  this.applyStyle = function () {
    this.wrapper.style.width = this.totalImages * this.imageWidth + 5 + 'px';
    this.wrapper.style.height = this.imageHeight + 'px';

  }

  this.drawNavigationButtons = function () {
    prevButton = document.createElement('div');
    prevButton.style.display = 'inline-block';
    prevButton.style.position = 'absolute';
    prevButton.style.zIndex = '30';
    prevButton.style.left = '0px';
    prevButton.style.top = '50%';
    prevButton.style.width = '50px';
    prevButton.style.height = '50px';
    prevButton.style.backgroundImage = 'url("images/navigation/prev.png")';
    prevButton.style.backgroundSize = 'contain';

    nextButton = document.createElement('div');
    nextButton.style.display = 'inline-block';
    nextButton.style.position = 'absolute';
    nextButton.style.zIndex = '30';
    nextButton.style.right = '0px';
    nextButton.style.top = '50%';
    nextButton.style.width = '50px';
    nextButton.style.height = '50px';
    nextButton.style.backgroundImage = 'url("images/navigation/next.png")';
    nextButton.style.backgroundSize = 'contain';

    this.container.appendChild(prevButton)
    this.container.appendChild(nextButton)
  }

  this.drawIndicators = function () {
    indicators = document.createElement('div');
    indicators.style.position = 'absolute';
    indicators.style.height = '25px';
    indicators.style.width = '100%';
    indicators.style.bottom = '10px';
    indicators.style.textAlign = 'center';
    ul = document.createElement('ul')

    for (var i = 1; i <= this.totalImages; i++) {
      li = document.createElement('li');
      li.style.height = '25px';
      li.style.width = '25px';
      li.style.borderRadius = '100%';
      li.style.backgroundColor = 'rgba(255,255,255,.7)';
      li.style.display = 'inline-block';
      li.style.margin = '0px 5px';
      li.addEventListener(
        "click",
        (function (slideNo) {
          return function () {
            goToSlide(slideNo);
          };
        })(i)
      );
      ul.appendChild(li);
    }

    indicators.appendChild(ul);
    this.container.appendChild(indicators);
  }

}
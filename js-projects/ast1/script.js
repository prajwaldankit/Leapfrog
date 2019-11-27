var carouselWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];
var carouselWidth = 1280;
var carouselHeight = 720;
var currentCarouselIndex = 1;
var currentCarouselPositionLeft = 0;
var carouselData = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg', 'images/image5.jpg'];
var totalData = 0;
var carouselElement = document.createElement('ul');

function initCarousel() {
  carouselWrapper.appendChild(carouselElement);

  initData(carouselData);
  applyStyle();
  drawNavigationButtons();
  drawPositionButtons();
}

function applyStyle() {
  carouselWrapper.style.overflow = 'hidden';
  carouselWrapper.style.margin = '30px auto';
  carouselWrapper.style.boxShadow = '0px 0px 12px #111';
  carouselWrapper.style.position = 'relative';
  carouselWrapper.style.width = carouselWidth + 'px';
  carouselWrapper.style.height = carouselHeight + 'px';

  carouselElement.style.position = 'absolute';
  carouselElement.style.left = '-' + currentCarouselPositionLeft + 'px';
}

function initData(carouselData) {
  totalData = carouselData.length;

  carouselElement.style.width = totalData * carouselWidth + 'px';

  carouselData.forEach(function (singleData) {
    carouselElement.appendChild(
      createSingleSlideElement(singleData)
    );
  })
}

function createSingleSlideElement(imageSource) {
  var outerLi = document.createElement('li');
  var outerAnchor = document.createElement('a');
  var image = document.createElement('img');

  outerLi.style.display = 'inline-block';
  outerLi.style.float = 'left';

  outerAnchor.style.display = 'block';

  image.style.width = carouselWidth + 'px';
  image.style.height = carouselHeight + 'px';

  outerAnchor.href = '#';
  image.src = imageSource;

  outerAnchor.appendChild(image);
  outerLi.appendChild(outerAnchor);

  return outerLi;
}

function drawNavigationButtons() {
  var nextButton = document.createElement('img');
  nextButton.style.position = 'absolute';
  nextButton.style.right = '0px';
  nextButton.style.top = '50%';
  nextButton.style.height = '64px';
  nextButton.style.width = '64px';
  // nextButton.style.backgroundColor = 'red';
  // nextButton.style.boxShadow = '0px 0px 8px #111';
  nextButton.style.onMouseHover
  nextButton.src = './images/navigation/next.png';

  var prevButton = document.createElement('img');
  prevButton.style.position = 'absolute';
  prevButton.style.left = '0px';
  prevButton.style.top = '50%';
  prevButton.style.height = '64px';
  prevButton.style.width = '64px';
  // prevButton.style.backgroundColor = 'white';
  // prevButton.style.boxShadow = '0px 0px 20px #111';
  prevButton.src = './images/navigation/prev.png';

  nextButton.addEventListener('click', function () { nextImage() });
  prevButton.addEventListener('click', function () { prevImage() });

  carouselWrapper.appendChild(nextButton)
  carouselWrapper.appendChild(prevButton)
}

function drawPositionButtons() {
  var buttons = document.createElement('div');
  buttons.style.position = 'absolute';
  buttons.style.height = '25px';
  buttons.style.bottom = '10px';
  buttons.style.width = '100%';
  buttons.style.textAlign = 'center';
  var ul = document.createElement('ul');

  for (var i = 1; i <= totalData; i++) {
    var li = document.createElement('li');
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

  buttons.appendChild(ul);
  carouselWrapper.appendChild(buttons);
}

// console.log(currentCarouselIndex);

function goToSlide(slideNo) {
  currentCarouselIndex = ((slideNo > totalData) ? 1 : ((slideNo <= 0) ? totalData : slideNo));
  currentCarouselPositionLeft = (currentCarouselIndex - 1) * carouselWidth;
  console.log('index:', currentCarouselIndex);
  applyStyle();
}

function nextImage() {
  // console.log(currentCarouselIndex);
  goToSlide(currentCarouselIndex + 1);
}

function prevImage() {
  // console.log(currentCarouselIndex);
  goToSlide(currentCarouselIndex - 1);
}

initCarousel();

setInterval(function () {
  nextImage();
}, 3000)
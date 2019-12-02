//create the  container with styles
var container = document.getElementById('container');
container.style.height = CONTAINER_HEIGHT + 'px';
container.style.width = CONTAINER_WIDTH + 'px';
container.style.backgroundColor = '#000';
container.style.overflow = 'hidden';


var gameWrapper = document.getElementById('gameWrapper');
gameWrapper.style.position = 'relative';
gameWrapper.style.height = '100%';
gameWrapper.style.width = '100%';
gameWrapper.style.backgroundImage = 'url("./assets/images/roadstripe.png")';
gameWrapper.style.backgroundSize = '100%';
gameWrapper.style.backgroundRepeat = 'repeat-y';
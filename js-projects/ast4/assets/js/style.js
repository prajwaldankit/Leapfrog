//create the  container with styles
var containerLane = document.getElementById('containerLane');
containerLane.style.height = CONTAINER_HEIGHT + 'px';
containerLane.style.width = CONTAINER_WIDTH + 'px';
containerLane.style.backgroundColor = '#000';
containerLane.style.overflow = 'hidden';


var containerStrips = document.getElementById('containerStrips');
containerStrips.style.position = 'relative';
containerStrips.style.height = '100%';
containerStrips.style.width = '100%';
containerStrips.style.backgroundImage = 'url("./assets/images/roadstripe.png")';
containerStrips.style.backgroundSize = '100%';
containerStrips.style.backgroundRepeat = 'repeat-y';
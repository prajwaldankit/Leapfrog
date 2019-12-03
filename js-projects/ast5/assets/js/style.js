for (let i = 0; i < gameContainers.length; i++) {
  gameContainers[i].style.width = `${GAME_WIDTH}px`;
  gameContainers[i].style.height = `${GAME_HEIGHT}px`;
  gameContainers[i].style.backgroundImage = `url(${BACKGROUND_IMAGES.night})`;
  gameContainers[i].style.margin = '10px auto';
}
for (let i = 0; i < gameBase.length; i++) {
  gameBase[i].style.width = `${GAME_WIDTH}px`;
}
// gameBase.style.width = `${GAME_WIDTH}px`;
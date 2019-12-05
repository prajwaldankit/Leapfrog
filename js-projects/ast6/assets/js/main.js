/**
 *
 *
 * @class Helix
 */
class Helix {
  /**
   *Creates an instance of Helix.
   * @param {*} parent
   * @memberof Helix
   */
  constructor(parent) {
    this.parent = parent;
    this.parent.style.backgroundColor = 'black';
    this.canvas = undefined;
    this.initCanvas();
    this.context = this.canvas.getContext('2d');
    this.phase = 0;
    this.speed = 0.03;
    this.maxCircleRadius = 5;
    this.frameCount = 0;
    this.numRows = 10;
    this.numCols = 30;
    this.numStrands = 2;
    this.y;
    // this.drawHelix();
    window.requestAnimationFrame(this.drawHelix.bind(this));

  }

  /**
   *
   *
   * @memberof Helix
   */
  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.applyStyle();
    this.parent.appendChild(this.canvas);
  }

  /**
   *
   *
   * @memberof Helix
   */
  applyStyle() {
    this.canvas.width = '700';
    this.canvas.height = '400';
  }

  /**
   *
   *
   * @memberof Helix
   */
  drawHelix = () => {
    this.context.clearRect(0, 0, 700, 400);
    let x = 0;
    let colOffset = 0;
    this.frameCount++;

    if (true) {
      window.requestAnimationFrame(this.drawHelix.bind(this));
    }
    console.log('framenumber', this.frameCount);
    this.phase = this.frameCount * this.speed;
    for (let count = 0; count < this.numStrands; count++) {
      // console.log('firstloop')
      if (count === 0) {
        this.strandPhase = this.phase;
      } else {
        this.strandPhase = this.phase + count * Math.PI;
      }
      x = 0;
      for (let col = 0; col < this.numCols; col++) {
        // console.log('secondloop')
        x = x + 10;
        colOffset = (col) / 5;

        for (let row = 0; row < this.numRows; row += 1) {
          // console.log('thirdloop')
          let y = this.canvas.height / 2 + row * 10 + Math.sin(this.strandPhase + colOffset) * 50;
          let sizeOffset = (Math.cos(this.strandPhase - (row * 0.1) + colOffset) + 1) * 0.4;
          let circleRadius = sizeOffset * this.maxCircleRadius;

          this.context.beginPath();
          this.context.arc(x, y, circleRadius, 0, Math.PI * 2, false);
          this.context.fillStyle = 'royalBlue';
          this.context.fill();
          this.context.closePath();
        }
      }
    }
  }
}
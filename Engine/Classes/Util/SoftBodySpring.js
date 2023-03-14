class SoftBodySpring {


  /**
   * @type {{x: number, y: number}[]}
   */
  points;
  /**
   * @type {number}
   */
  k;

  /**
   * @type {number}
   */
  initialPositionDifference;

  /**
   * @type {number}
   */
  positionDifference;


  /**
   * @param {SoftBodyPoint[]} points 
   * @param {number} k 
   */
  constructor(points, k) {
    this.points = points;
    this.k = k;

    const { x: x1, y: y1 } = this.points[0];
    const { x: x2, y: y2 } = this.points[1];

    this.initialPositionDifference = Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));


    this.updatePositionDifference();
  }

  /**
   * 
   * @param {number} x1 
   * @param {number} y1 
   * @param {number} x2 
   * @param {number} y2 
   */
  updatePoints(x1, y1, x2, y2) {

    this.points[0].x = x1;
    this.points[0].y = y1;
    this.points[1].x = x2;
    this.points[1].y = y2;

    this.updatePositionDifference();
  }

  updatePositionDifference() {
    const { x: x1, y: y1 } = this.points[0];
    const { x: x2, y: y2 } = this.points[1];

    this.positionDifference = Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
  }

  calculateForce() {
    if (Math.abs(this.initialPositionDifference - this.positionDifference) < 0.001) return 0;
    // the "- this.k" slows the springs down
    return (this.initialPositionDifference - this.positionDifference) * this.k - this.k;
  }

}
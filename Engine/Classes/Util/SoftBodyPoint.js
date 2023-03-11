class SoftBodyPoint {
  /** @type {number} */
  x;
  /** @type {number} */
  y;

  velocity = new Velocity(0, 0);

  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
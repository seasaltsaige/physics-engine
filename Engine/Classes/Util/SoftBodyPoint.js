class SoftBodyPoint {
  /** @type {number} */
  x;
  /** @type {number} */
  y;

  velocity = new Velocity(0, 0);

  /**
   * Should be the initial setting, and on each frame
   * it should attempt to move itself back to this distance, if it isnt already there
   * values of that will need tinkering
   * @type {{x: number; y: number}[]}
   */
  distToOtherPoints = []

  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
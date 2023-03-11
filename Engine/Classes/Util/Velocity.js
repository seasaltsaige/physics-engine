class Velocity {

  /**
   * @type {number}
   */
  x;
  /**
 * @type {number}
 */
  y;

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  add(x, y) {
    this.x += x;
    this.y += y;
  }

  /**
   *    
   * @param {number} x 
   * @param {number} y 
   */
  set(x, y) {
    this.x = x;
    this.y = y;
  }

}
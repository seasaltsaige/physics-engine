class SoftBodyCollider extends Script {
  /**
   * @type {SoftBodyObject}
   */
  parent;
  /**
   * @param {SoftBodyObject} parent 
   */
  constructor(parent) {
    super(parent);
    this.parent = parent;
  }

  run() { }

  collisionCheck() {
    const otherObjects = GameManager.objects.filter((v) => v.id !== this.parent.id && v instanceof SoftBodyObject);
    for (const obj of otherObjects) {

      for (const point of this.parent.points) {
        // If collided
        // check point outside of bounding box
        // if line to that point intersects with an odd number of lines of the other object, it is collided




        // make not collided
      }

    }


    // for (const )

  }

  // From 
  // https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
  /**
   * 
   * @param {{a: number; b: number;}} param0 
   * @param {{c: number; d: number}} param1 
   * @param {{p: number; q: number}} param2 
   * @param {{r: number; s: number}} param3 
   */
  intersects({ a, b }, { c, d }, { p, q }, { r, s }) {
    const det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0)
      return false;

    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);

  }

  /**
   * @param {{x: number; y: number}} point 
   * @returns 
   */
  getPoint(point) {
    return {
      x: point.x,
      y: this.parent.boundingBox.top_left.y - 20,
    }
  }

}
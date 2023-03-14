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
    /**
     * @type {SoftBodyObject[]}
     */
    const otherObjects = GameManager.objects.filter((v) => v.id !== this.parent.id && v instanceof SoftBodyObject);
    for (const obj of otherObjects) {

      for (const point of this.parent.points) {
        // console.log(point);
        const { x: p, y: q } = point;
        const { x: r, y: s } = this.getPoint(point);

        //   // If collided
        //   // check point outside of bounding box
        //   // if line to that point intersects with an odd number of lines of the other object, it is collided

        // ONLY UPDATE IF DISTANCE IS CLOSER
        let { closest_x, closest_y } = { closest_x: 100000000, closest_y: 100000000 };
        // GOTTA MAKE THESE TWO POINTS REACT AS WELL
        // IF THE PLATFORM IS FIXED, HOPEFULLY IT DOESNT FREAK OUT
        let { x1_collided, y1_collided } = { x1_collided: null, y1_collided: null };
        let { x2_collided, y2_collided } = { x1_collided: null, y1_collided: null };

        let collided = false;
        if (obj.points.length % 2 === 0) {
          for (let i = 0; i < obj.points.length - 2; i += 2) {
            const { x: x1, y: y1 } = obj.points[i];
            const { x: x2, y: y2 } = obj.points[i + 1];
            if (this.intersects({ a: x1, b: y1 }, { c: x2, d: y2 }, { p, q }, { r, s })) {
              collided = true;
              const closest = this.closest_point(x1, y1, x2, y2, p, q);
              if (this.distance(p, q, closest_x, closest_y) > this.distance(p, q, closest.x, closest.y)) {
                closest_x = closest.x;
                closest_y = closest.y;

                x1_collided = x1;
                y1_collided = y1;
                x2_collided = x2;
                y2_collided = y2;
              }
            }

          }

        }

        if (collided) {

          const { halfx, halfy } = { halfx: Math.abs(closest_x + point.x) / 2, halfy: Math.abs(closest_y + point.y) / 2 }

          point.x = halfx;
          point.y = halfy;

          /**
           * @type {SoftBody}
           */
          const sb = this.parent.getScript(SoftBody);
          if (sb !== null) {
            const height = Math.abs(y2_collided - y1_collided);
            const length = this.distance(x1_collided, y1_collided, x2_collided, y2_collided);
            const angle = Math.asin(height / length);

            const curVelocityMAG = Math.sqrt(Math.pow(point.velocity.x, 2) + Math.pow(point.velocity.y, 2));

            let newXVel = Math.cos(angle - Math.PI / 2);
            if (y2_collided < y1_collided) newXVel = -newXVel;
            const newYVel = Math.sin(Math.PI / 2 - angle);

            point.velocity.set(newXVel * curVelocityMAG * sb.elasticity, -newYVel * curVelocityMAG * sb.elasticity);
          }

          for (const p of this.parent.points) {
            p.velocity.set(p.velocity.x * 0.91, p.velocity.y * 0.91)
          }
        }


        //   // make not collided
      }
    }
  }


  /**
   * 
   * @param {number} x1 
   * @param {number} y1 
   * @param {number} x2 
   * @param {number} y2 
   */
  distance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
  }


  // From
  // https://stackoverflow.com/questions/5204619/how-to-find-the-point-on-an-edge-which-is-the-closest-point-to-another-point
  /**
   * @param {number} x1 Point of line
   * @param {number} y1 Point of line
   * @param {number} x2 Point of line
   * @param {number} y2 Point of line
   * @param {number} a Point to calculate from x 
   * @param {number} b Point to calculate from x 
   * @returns 
   */
  closest_point(x1, y1, x2, y2, a, b) {
    if (x1 == x2) return { x: x1, y: b }
    if (y1 == y2) return { x: a, y: y1 }
    const m1 = (y2 - y1) / (x2 - x1)
    const m2 = -1 / m1
    const x = (m1 * x1 - m2 * a + b - y1) / (m1 - m2)
    const y = m2 * (x - a) + b
    return { x, y }
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
   * @param {SoftBodyPoint} point
   * @returns 
   */
  getPoint(point) {
    return {
      x: point.x,
      y: this.parent.boundingBox.top_left.y - 20,
    }
  }

}
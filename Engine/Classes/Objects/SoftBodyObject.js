class SoftBodyObject extends GameObject {

  /**
   * @type {SoftBodyPoint[]}
   */
  points = [];
  // top-left -> top-right -> bottom-right -> bottom-left
  boundingBox = {
    top_left: { x: 0, y: 0 },
    top_right: { x: 0, y: 0 },
    bottom_right: { x: 0, y: 0 },
    bottom_left: { x: 0, y: 0 },
  }

  /**
   * @type {number}
   */
  k_constant;

  /**
   * @type {number}
   */
  mass;

  /**
   * @type {SoftBodySpring[]}
   */
  springs = [];

  /**
   * for a soft body x and y will be the top left of the bounding box 
   * @param {{ color: string, height: number, width: number; x: number; y: number; z_index: number; points: {x: number; y: number}[]; mass: number; k_constant: number }} param0 
   */
  constructor({ color, x, y, z_index, points, mass, k_constant }) {
    super({ color, height: null, width: null, x, y, z_index });
    this.mass = mass;
    this.k_constant = k_constant;
    for (const p of points) {
      this.points.push(
        new SoftBodyPoint(p.x + x, p.y + y)
      );
    }
  }

  onLoad() {
    // there should be a spring between every two points
    const first = this.points[0];
    const last = this.points[this.points.length - 1];

    // for (let inc = 1; inc < this.points.length - 1; inc++) {
    //   for (let i = 0; i < this.points.length - inc; i += 1) {
    //     const p1 = this.points[i];
    //     const p2 = this.points[i + inc];

    //     this.springs.push(
    //       new SoftBodySpring(
    //         [p1, p2], this.k_constant
    //       )
    //     )
    //   }
    // }

    for (let i = 0; i < this.points.length / 2; i++) {
      // console.log(i, this.points.length - i);
      this.springs.push(
        new SoftBodySpring(
          [
            this.points[i],
            this.points[this.points.length - i - 1]
          ],
          this.k_constant,
        )
      );

      if (i !== this.points.length / 2 - 1) {
        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[i + 1]
            ],
            this.k_constant
          )
        );

        this.springs.push(
          new SoftBodySpring(
            [
              this.points[this.points.length - i - 1],
              this.points[this.points.length - i - 2],
            ],
            this.k_constant
          )
        )

        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[this.points.length - i - 2],
            ],
            this.k_constant
          )
        )
      }

      if (i > 0) {
        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[this.points.length - i],
            ],
            this.k_constant
          )
        )
      }


    }

    // this.springs.push(new SoftBodySpring([last, first], this.k_constant));
    // this.updateBoundingBox();
  }

  updateBoundingBox() {
    let min_x = Infinity;
    let max_x = -Infinity;
    let min_y = Infinity;
    let max_y = -Infinity;

    for (const p of this.points) {
      if (p.x > max_x) max_x = p.x;
      if (p.x < min_x) min_x = p.x;
      if (p.y > max_y) max_y = p.y;
      if (p.y < min_y) min_y = p.y;
    }

    this.boundingBox = {
      top_left: { x: min_x, y: min_y },
      bottom_left: { x: min_x, y: max_y },
      top_right: { x: max_x, y: min_y },
      bottom_right: { x: max_x, y: max_y },
    };
  }


  onRender() {
    super.onRender();
    /**
     * @type {SoftBody}
     */

    for (const spring of this.springs) {
      const p1 = this.points.find(v => v.x === spring.points[0].x && v.y === spring.points[0].y);
      const p2 = this.points.find(v => v.x === spring.points[1].x && v.y === spring.points[1].y);

      spring.updatePoints(p1.x, p1.y, p2.x, p2.y);;

      const force_total = spring.calculateForce();

      if (force_total == 0) continue;
      const height = Math.abs(p2.y - p1.y);
      const length = spring.positionDifference;

      const angle = Math.asin(height / length);

      // technically these are accelerations....
      const y_f = Math.sin(angle) * force_total / this.mass;
      const x_f = Math.cos(angle) * force_total / this.mass;


      const p1v_x = (p2.x - p1.x === Math.abs(p2.x - p1.x)) ? -x_f : x_f;
      const p1v_y = (p2.y - p1.y === Math.abs(p2.y - p1.y)) ? -y_f : y_f

      const p2v_x = (p2.x - p1.x === Math.abs(p2.x - p1.x)) ? x_f : -x_f;
      const p2v_y = (p2.y - p1.y === Math.abs(p2.y - p1.y)) ? y_f : -y_f;

      p1.velocity.add(p1v_x, p1v_y);
      p2.velocity.add(p2v_x, p2v_y);
    }
    const sb = this.getScript(SoftBody);
    if (sb.fixed) return;

  }



}
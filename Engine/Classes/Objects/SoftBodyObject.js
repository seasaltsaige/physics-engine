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

  /** @type {number} */
  points_x_amm;
  /** @type {number} */
  points_y_amm;

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
  * Bound radius in pixels in which other points CAN NOT enter (of the same body)
  * @type {number}
  */
  boundRadius = 10;

  /**
   * for a soft body x and y will be the top left of the bounding box 
   * @param {{ color: string, height: number, width: number; x: number; y: number; z_index: number; points: {x: number; y: number}[]; mass: number; k_constant: number; points_x_amm: number; points_y_amm }} param0 
   */
  constructor({ color, x, y, z_index, points, mass, k_constant, points_x_amm, points_y_amm }) {
    super({ color, height: null, width: null, x, y, z_index });
    this.mass = mass;
    this.k_constant = k_constant;
    this.points_x_amm = points_x_amm;
    this.points_y_amm = points_y_amm;
    for (const p of points) {
      this.points.push(
        new SoftBodyPoint(p.x + x, p.y + y)
      );
    }
  }

  onLoad() {
    // x lengths
    // console.log(this.points[0]);
    for (let y = 0; y < this.points_y_amm; y++) {
      for (let x = 0; x < this.points_x_amm - 1; x++) {
        // console.log(x, y);
        const i = x + y * this.points_x_amm;
        console.log(i);
        // console.log(this.points[i], this.points[i + 1]);
        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[i + 1],
            ], this.k_constant,
          )
        )
      }
    }


    for (let x = 0; x < this.points_x_amm; x++) {
      for (let y = 0; y < this.points_y_amm - 1; y++) {
        const i = x + y * this.points_x_amm;
        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[i + this.points_x_amm],
            ], this.k_constant,
          )
        )
      }
    }




    for (let y = 0; y < this.points_y_amm - 1; y++) {
      for (let x = 0; x < this.points_x_amm - 1; x++) {
        // console.log(x, y);
        const i = x + y * this.points_x_amm;

        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[i + this.points_x_amm + 1],
            ], this.k_constant,
          )
        )

      }
    }

    for (let y = 0; y < this.points_y_amm - 1; y++) {
      for (let x = 1; x < this.points_x_amm; x++) {
        // console.log(x, y);
        const i = x + y * this.points_x_amm;

        this.springs.push(
          new SoftBodySpring(
            [
              this.points[i],
              this.points[i + this.points_x_amm - 1],
            ], this.k_constant,
          )
        )

      }
    }


    // for (let x = 0; y < this.points_x_amm; x++) {
    //   for (let y = 0; x < this.points_y_amm - 1; y++) {
    //     // console.log(x, y);
    //     const i = x + y * this.points_x_amm;
    //     console.log(i);
    //     // console.log(this.points[i], this.points[i + 1]);
    //     this.springs.push(
    //       new SoftBodySpring(
    //         [
    //           this.points[i],
    //           this.points[i + 1],
    //         ], this.k_constant,
    //       )
    //     )
    //   }
    // }


    console.log(this.springs);


    // for (let i = 0; i < this.points.length / 2; i++) {
    // console.log(i, this.points.length - i);
    // this.springs.push(
    //   new SoftBodySpring(
    //     [
    //       this.points[i],
    //       this.points[this.points.length - i - 1]
    //     ],
    //     this.k_constant,
    //   )
    // );

    // if (i !== this.points.length / 2 - 1) {
    //   this.springs.push(
    //     new SoftBodySpring(
    //       [
    //         this.points[i],
    //         this.points[i + 1]
    //       ],
    //       this.k_constant
    //     )
    //   );

    //   this.springs.push(
    //     new SoftBodySpring(
    //       [
    //         this.points[this.points.length - i - 1],
    //         this.points[this.points.length - i - 2],
    //       ],
    //       this.k_constant
    //     )
    //   )

    //   this.springs.push(
    //     new SoftBodySpring(
    //       [
    //         this.points[i],
    //         this.points[this.points.length - i - 2],
    //       ],
    //       this.k_constant
    //     )
    //   )
    // }

    // if (i > 0) {
    //   this.springs.push(
    //     new SoftBodySpring(
    //       [
    //         this.points[i],
    //         this.points[this.points.length - i],
    //       ],
    //       this.k_constant
    //     )
    //   )
    // }


    // }
    this.updateBoundingBox();
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

    // TODO: Make it so if points get too close to eachother, they get FORCED away from eachother in a way that makes it seem like a bounce

    super.onRender();
    /**
     * @type {SoftBody}
     */


    // Loop through every point for each point
    for (const point of this.points) {
      for (const point_other of this.points) {
        const width = Math.abs(point.x - point_other.x);
        const height = Math.abs(point.y - point_other.y);
        // console.log(width, height);

        const distance_hyp = Math.sqrt(
          (Math.pow((point.x - point_other.x), 2)) +
          (Math.pow((point.y - point_other.y), 2))
        );

        if (distance_hyp === 0) continue;
        if (distance_hyp > this.boundRadius)
          continue;

        const newDist = this.boundRadius;
        const angle = Math.asin(height / distance_hyp);

        let newPosY = newDist * Math.sin(angle) - distance_hyp * Math.sin(angle);
        let newPosX = newDist * Math.cos(angle) - distance_hyp * Math.cos(angle);

        newPosX = (point_other.x - point.x === Math.abs(point_other.x - point.x)) ? -newPosX : newPosX;
        newPosY = (point_other.y - point.y === Math.abs(point_other.y - point.y)) ? newPosY : -newPosY;

        // console.log(newPosX, newPosY)

        point.x -= newPosX;
        point.y -= newPosY;


        const curVelocityMAG = Math.sqrt(Math.pow(point.velocity.x, 2) + Math.pow(point.velocity.y, 2));
        let v_y = curVelocityMAG * Math.sin(angle);
        let v_x = curVelocityMAG * Math.cos(angle);



        const p1v_x = (point_other.x - point.x === Math.abs(point_other.x - point.x)) ? -v_x : v_x;
        const p1v_y = (point_other.y - point.y === Math.abs(point_other.y - point.y)) ? -v_y : v_y

        const p2v_x = (point_other.x - point.x === Math.abs(point_other.x - point.x)) ? v_x : -v_x;
        const p2v_y = (point_other.y - point.y === Math.abs(point_other.y - point.y)) ? v_y : -v_y;

        // console.log(p1v_x, p1v_y)

        point.velocity.add(p1v_x, p1v_y);
        point_other.velocity.add(p2v_x, p2v_y);


      }
    }

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


      // IF THE PARENT SOFTBODY SCRIPT IS FIXED THIS NEEDS TO ONLY 
      // AFFECT THE POINTS THAT ARE MOVING INITIALLY, NO OTHER POINTS

      const p1v_x = (p2.x - p1.x === Math.abs(p2.x - p1.x)) ? -x_f : x_f;
      const p1v_y = (p2.y - p1.y === Math.abs(p2.y - p1.y)) ? -y_f : y_f

      const p2v_x = (p2.x - p1.x === Math.abs(p2.x - p1.x)) ? x_f : -x_f;
      const p2v_y = (p2.y - p1.y === Math.abs(p2.y - p1.y)) ? y_f : -y_f;

      p1.velocity.add(p1v_x, p1v_y);
      p2.velocity.add(p2v_x, p2v_y);


    }

  }



}
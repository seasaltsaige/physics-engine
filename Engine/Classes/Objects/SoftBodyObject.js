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
   * for a soft body x and y will be the top left of the bounding box 
   * @param {{ color: string, height: number, width: number; x: number; y: number; z_index: number; points: {x: number; y: number}[] }} param0 
   */
  constructor({ color, x, y, z_index, points }) {
    super({ color, height: null, width: null, x, y, z_index });
    for (const p of points) {
      this.points.push(
        new SoftBodyPoint(p.x + x, p.y + y)
      );
    }
  }

  onLoad() {
    // set initial distances to points
    for (const point of this.points) {
      for (const p of this.points.filter(v => v.x !== point.x && v.y !== point.y)) {
        point.distToOtherPoints.push(
          { x: p.x - point.x, y: p.y - point.y },
        )
      }
    }

    console.log(this.points);

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
    super.onRender();
  }

}
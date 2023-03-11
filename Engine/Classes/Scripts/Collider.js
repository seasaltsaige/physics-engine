class Collider extends Script {
  /**
    * @param {GameObject} parent 
    */
  constructor(parent) {
    super(parent);
  }

  run() { }


  /**
   * 
   * @param {GameObject} parent 
   * @param {GameObject} obj 
   */
  getDistCollisions(parent, obj) {

    const dist_x_left = -(parent.x + parent.width - obj.x);
    const dist_x_right = obj.x + obj.width - parent.x;
    const dist_y_top = -(parent.y + parent.height - obj.y);
    const dist_y_bottom = obj.y + obj.height - parent.y;

    if (
      Math.abs(dist_x_left) < Math.abs(dist_x_right) &&
      Math.abs(dist_x_left) < Math.abs(dist_y_top) &&
      Math.abs(dist_x_left) < Math.abs(dist_y_bottom)
    )
      return { dist: dist_x_left, dir: "x" };
    else if (
      Math.abs(dist_x_right) < Math.abs(dist_x_left) &&
      Math.abs(dist_x_right) < Math.abs(dist_y_top) &&
      Math.abs(dist_x_right) < Math.abs(dist_y_bottom)
    )
      return { dist: dist_x_right, dir: "x" };
    else if (
      Math.abs(dist_y_top) < Math.abs(dist_x_left) &&
      Math.abs(dist_y_top) < Math.abs(dist_x_right) &&
      Math.abs(dist_y_top) < Math.abs(dist_y_bottom)
    )
      return { dist: dist_y_top, dir: "y" };
    else
      return { dist: dist_y_bottom, dir: "y" };

  }

  collisionCheck() {
    const gameObjects = GameManager.objects.filter((ob) => ob.id !== this.parent.id).filter(obj => obj.scripts.find(v => v instanceof Collider));
    const parent = this.parent;
    /**
     * @type {RigidBody | null}
     */
    const rigidbody = this.parent.getScript(RigidBody);


    for (const obj of gameObjects) {
      // gotta decide which type to do
      // if the body is "above" and fully "inbetween" the obj do y otherwise x?
      if (
        parent.y + parent.height >= obj.y &&
        parent.y <= obj.y + obj.height
        // x range
        && (parent.x + parent.width >= obj.x)
        && (parent.x <= obj.x + obj.width)
      ) {
        const values = this.getDistCollisions(parent, obj);

        if (values !== undefined) {
          parent[values.dir] += values.dist;
          if (values.dir === "x")
            parent.velocity.x = 0;
          else {
            parent.velocity.y = 0;
            rigidbody.isGrounded = true;
          }
        }
      }



    }
  }

}
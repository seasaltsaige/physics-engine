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

    const dist_x_left = parent.x + parent.width - obj.x;

    const dist_x_right = obj.x + obj.width - parent.x;

    console.log(dist_x_left, dist_x_right)

  }


  collisionCheck() {
    const gameObjects = GameManager.objects.filter((ob) => ob.id !== this.parent.id).filter(obj => obj.scripts.find(v => v instanceof Collider));
    const parent = this.parent;
    /**
     * @type {RigidBody | null}
     */
    const rigidbody = this.parent.getScript(RigidBody);

    for (const obj of gameObjects) {
      console.log(this.getDistCollisions({
        x: parent.velocity.x === Math.abs(parent.velocity.x) ? 1 : -1,
        y: parent.velocity.y === Math.abs(parent.velocity.y) ? 1 : -1,
      }, parent, obj));

      // gotta decide which type to do
      // if the body is "above" and fully "inbetween" the obj do y otherwise x?
      if (
        parent.y + parent.height >= obj.y &&
        parent.y <= obj.y + obj.height
        // x range
        && (parent.x + parent.width >= obj.x)
        && (parent.x <= obj.x + obj.width)
      ) {
        if (parent.velocity.y !== Math.abs(parent.velocity.y)) {
          parent.velocity.set(parent.velocity.x, 0);
          parent.y = obj.y + obj.height;
        } else {
          parent.velocity.set(parent.velocity.x, 0);
          parent.y -= (parent.y + parent.height - obj.y);
          rigidbody.isGrounded = true;
        }
      }



    }
  }

}
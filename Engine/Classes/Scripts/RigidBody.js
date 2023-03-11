class RigidBody extends Script {

  gravityStrength = 0.5;
  isGrounded = false;
  friction = 0.97;

  /**
   * @param {GameObject} parent 
   */
  constructor(parent) {
    super(parent);
  }

  run() {
    this.parent.velocity.add(0, this.gravityStrength);
    this.parent.y += this.parent.velocity.y;
    this.parent.x += this.parent.velocity.x;

    /**
     * @type {Collider | null}
     */
    const collider = this.parent.getScript(Collider);
    if (collider !== null) {
      collider.collisionCheck();
    }

    this.parent.velocity.x *= this.friction;
    if (Math.abs(this.parent.velocity.x) < 0.01) this.parent.velocity.x = 0;

  }

}
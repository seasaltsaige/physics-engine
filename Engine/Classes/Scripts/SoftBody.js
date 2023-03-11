class SoftBody extends Script {

  /**
   * @type {boolean}
   */
  fixed;
  /**
   * @type {number}
   */
  gravity = 0.3;
  /**
   * How strong the springs are between 0 and 1 (inverse) higher number means a springy-er spring
   * 
   * 0 elasticity equates to a rigid body. 1 is a perfect spring
   * @type {number}
   */
  elasticity = 0.5;

  /**
   * @type {SoftBodyObject}
   */
  parent;

  /**
   * @param {SoftBodyObject} parent 
   * @param {{ fixed: boolean; gravity?: number; elasticity?: number }} param1
   */
  constructor(parent, { fixed, gravity, elasticity }) {
    super(parent);
    this.parent = parent;
    this.fixed = fixed;
    if (gravity) this.gravity = gravity;
    if (elasticity) this.elasticity = elasticity;
  }

  run() {

    /**
     * @type {SoftBodyCollider | null}
     */
    const collider = this.parent.getScript(SoftBodyCollider);


    // Physics MOVEMENT
    if (this.fixed === true) return;
    for (const p of this.parent.points) {
      p.velocity.add(0, this.gravity);
      p.x += p.velocity.x;
      p.y += p.velocity.y;
    }
    this.parent.velocity.add(0, this.gravity);

    for (const k in this.parent.boundingBox) {
      const p = this.parent.boundingBox[k];
      p.x += this.parent.velocity.x;
      p.y += this.parent.velocity.y;
    }

    // console.log("Im a softbody physics object");
  }

}
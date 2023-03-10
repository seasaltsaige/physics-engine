class RigidBody extends Script {

  gravityStrength = 0.5;

  constructor(parent) {
    super(parent);
  }

  run() {
    this.parent.velocity.add(0, this.gravityStrength);
    this.parent.y += this.parent.velocity.y;
  }

}
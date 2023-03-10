class Square extends GameObject {

  /**
   * @type {RigidBody | undefined}
   */
  rigidBody;

  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }

  onRender() {
    if (this.rigidBody !== undefined)
      this.rigidBody.run();
  }

}
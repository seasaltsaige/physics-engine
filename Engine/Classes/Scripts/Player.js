class Player extends Script {

  keymap = {};

  constructor(parent) {
    super(parent);
  }

  onLoad() {
    /**
     * 
     * @param {KeyboardEvent} event 
     */
    window.onkeydown = (event) => {
      this.keymap[event.key] = true;
      if (this.keymap[" "]) {
        /**
         * @type {RigidBody | null}
         */
        const rigidbody = this.parent.getScript(RigidBody);
        console.log(rigidbody.isGrounded);
        if (rigidbody.isGrounded) {
          // this.parent.y += 2;
          this.parent.velocity.add(0, -15);
          rigidbody.isGrounded = false;
        }
      }

      if (this.keymap["d"]) {
        this.parent.velocity.add(2, 0);
      }

      if (event.key === "a") {
        this.parent.velocity.add(-2, 0);
      }
    }

    window.onkeyup = (ev) => {
      this.keymap[ev.key] = false;
    }


  }
}
class GameObject {

  /** @type {number} */
  x;
  /** @type {number} */
  y;
  /** @type {number} */
  width;
  /** @type {number} */
  height;
  /** @type {number} */
  color;
  velocity = new Velocity(0, 0);
  /** @type {number} */
  z_index;

  /**
   * @type {number}
   */
  screen_x;
  /**
   * @type {number}
   */
  screen_y;

  /** @type {number} */
  id;

  /** @type {Script[]}*/
  scripts = [];

  constructor({ x, y, width, height, z_index, color }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.z_index = z_index;
    this.color = color;
  }

  /**
   * @param {Script[]} scripts 
   */
  appendScripts(scripts) {
    scripts.forEach((s) => {
      this.scripts.push(s);
      s.onLoad();
    });
  }

  onLoad() {

  }

  onRender() {
    for (const s of this.scripts) {
      s.run();
    }
  }
  /**
   * @template {Script} T
   * @param {T} scriptType 
   * @returns {T | null}
   */
  getScript(scriptType) {
    return this.scripts.find(v => (v instanceof scriptType)) || null;
  }

}
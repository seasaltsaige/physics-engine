class GameManager {

  static screenPos = { x: 0, y: 0 };

  /**
   * @type {GameObject[]}
   */
  static objects = [];
  /**
   * @type {CanvasRenderingContext2D}
   */
  static ctx;
  /**
   * @type {number}
   */
  static width;
  /**
 * @type {number}
 */
  static height;

  static nextId = 1;

  /**
   * 
   * @param {GameObject} object 
   */
  static addObject(object) {
    object.id = this.nextId;
    this.nextId++;

    this.objects.push(object);
    this.sort();
  }

  static sort() {
    this.objects.sort((a, b) => a.z_index > b.z_index);
  }

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  static updateScreenPos(x, y) {
    this.screenPos = { x, y };
  }

  static render() {

    GameManager.ctx.clearRect(0, 0, GameManager.ctx.canvas.width, GameManager.ctx.canvas.height);

    const playerObject = GameManager.objects.find(v => v.id == 1);
    // console.log(playerObject)

    const dist_x = ((GameManager.width / 2) - playerObject.x);
    const dist_y = ((GameManager.height / 2) - playerObject.y);
    // Lock camera to "player"
    GameManager.updateScreenPos(
      dist_x, dist_y
    );



    for (const object of GameManager.objects) {
      object.onRender();

      object.screen_x = object.x + GameManager.screenPos.x;
      object.screen_y = object.y + GameManager.screenPos.y;

      GameManager.ctx.fillStyle = object.color;

      GameManager.ctx.beginPath();
      GameManager.ctx.moveTo(object.screen_x, object.screen_y);

      GameManager.ctx.lineTo(object.screen_x, object.screen_y + object.height);
      GameManager.ctx.lineTo(object.screen_x + object.width, object.screen_y + object.height);
      GameManager.ctx.lineTo(object.screen_x + object.width, object.screen_y);
      GameManager.ctx.lineTo(object.screen_x, object.screen_y);

      GameManager.ctx.closePath();
      GameManager.ctx.fill();

    }
  }

}
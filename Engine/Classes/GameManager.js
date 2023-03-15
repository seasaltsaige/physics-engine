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
    object.onLoad();

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

    // const playerObject = GameManager.objects.find(v => v.id == 1);
    // console.log(playerObject)

    // const dist_x = ((GameManager.width / 2) - playerObject.x);
    // const dist_y = ((GameManager.height / 2) - playerObject.y);
    // Lock camera to "player"
    // GameManager.updateScreenPos(
    //   dist_x, dist_y
    // );



    for (const object of GameManager.objects.filter(v => v instanceof SoftBodyObject)) {
      /**
       * @type {SoftBodyObject}
       */
      const obj = object;
      // console.log(obj);
      obj.onRender();


      const ctx = GameManager.ctx;

      // ctx.strokeStyle = "red";
      // ctx.lineWidth = 3;

      // ctx.beginPath();
      // ctx.moveTo(obj.boundingBox.top_left.x, obj.boundingBox.top_left.y);
      // ctx.lineTo(obj.boundingBox.top_right.x, obj.boundingBox.top_right.y);
      // ctx.lineTo(obj.boundingBox.bottom_right.x, obj.boundingBox.bottom_right.y);
      // ctx.lineTo(obj.boundingBox.bottom_left.x, obj.boundingBox.bottom_left.y);
      // ctx.lineTo(obj.boundingBox.top_left.x, obj.boundingBox.top_left.y);

      // ctx.closePath();
      // ctx.stroke();

      ctx.fillStyle = obj.color;

      for (const p of obj.points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      // ctx.beginPath();
      // ctx.lineWidth = 1.5;
      // ctx.strokeStyle = obj.color;
      // ctx.moveTo(obj.points[0].x, obj.points[0].y);
      // for (let i = 1; i < obj.points.length; i++) {
      //   const p = obj.points[i];
      //   ctx.lineTo(p.x, p.y);
      // }
      // ctx.lineTo(obj.points[0].x, obj.points[0].y);
      // ctx.closePath();
      // ctx.stroke();

      // ctx.strokeStyle = "red";

      for (const spring of obj.springs) {
        ctx.beginPath();
        ctx.moveTo(spring.points[0].x, spring.points[0].y);
        ctx.lineTo(spring.points[1].x, spring.points[1].y);
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.stroke();

      }


      // object.screen_x = object.x + GameManager.screenPos.x;
      // object.screen_y = object.y + GameManager.screenPos.y;

      // GameManager.ctx.fillStyle = object.color;

      // GameManager.ctx.beginPath();
      // GameManager.ctx.moveTo(object.screen_x, object.screen_y);

      // GameManager.ctx.lineTo(object.screen_x, object.screen_y + object.height);
      // GameManager.ctx.lineTo(object.screen_x + object.width, object.screen_y + object.height);
      // GameManager.ctx.lineTo(object.screen_x + object.width, object.screen_y);
      // GameManager.ctx.lineTo(object.screen_x, object.screen_y);

      // GameManager.ctx.closePath();
      // GameManager.ctx.fill();

    }
  }

}
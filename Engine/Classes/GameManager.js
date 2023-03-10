class GameManager {

  /**
   * @type {GameObject[]}
   */
  static objects = [];
  /**
   * @type {CanvasRenderingContext2D}
   */
  static ctx;

  /**
   * 
   * @param {GameObject} object 
   */
  static addObject(object) {
    this.objects.push(object);
  }

  static render() {
    GameManager.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (const object of this.objects) {
      object.onRender();



      GameManager.ctx.fillStyle = object.color;
      GameManager.ctx.fillRect(object.x, object.y, object.width, object.height);

    }
  }

}
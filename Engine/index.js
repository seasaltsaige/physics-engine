window.onload = () => {
  /**
   * @type {HTMLCanvasElement}
   */
  const Window = document.getElementsByTagName("canvas")[0];
  Window.width = window.outerWidth;
  Window.height = window.outerHeight;
  console.log(Window)
  const ctx = Window.getContext("2d");

  const block = new Square(100, 100, 100, 100, "black");
  block.rigidBody = new RigidBody(block);
  block.rigidBody.gravityStrength
  const floor = new Square(0, Window.height * 2 / 3, Window.width, 100);

  GameManager.ctx = ctx;

  console.log(block);
  GameManager.addObject(block);
  GameManager.addObject(floor);
  renderLoop();

}


function renderLoop() {
  setInterval(() => {
    console.log(GameManager.objects[0]);
    GameManager.render();
  }, 40);
}
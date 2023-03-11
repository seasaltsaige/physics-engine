window.onload = () => {
  /**
   * @type {HTMLCanvasElement}
   */
  const Window = document.getElementsByTagName("canvas")[0];
  Window.width = window.outerWidth;
  Window.height = window.outerHeight;

  const ctx = Window.getContext("2d");

  const block = new Square({
    x: Window.width / 2,
    y: 100,
    width: 100,
    height: 100,
    z_index: 100,
    color: "grey"
  });

  block.appendScripts([
    new RigidBody(block),
    new Collider(block),
    new Player(block),
  ]);

  const floor = new Square({
    x: 0,
    y: Window.height * 2 / 3 - 50,
    width: Window.width,
    height: 50,
    z_index: 1,
    color: "brown"
  });

  floor.appendScripts([
    new Collider(floor),
  ]);

  const floor2 = new Square({
    x: Window.width / 2,
    y: Window.height * 2 / 3 - 225,
    height: 50,
    width: 300,
    z_index: 1,
    color: "brown",
  });
  floor2.appendScripts([
    new Collider(floor2),
  ]);

  GameManager.ctx = ctx;
  GameManager.width = Window.width;
  GameManager.height = Window.height;
  GameManager.addObject(block);
  GameManager.addObject(floor);
  GameManager.addObject(floor2);

  renderLoop();
}


function renderLoop() {
  setInterval(() => {
    GameManager.render();
  }, 10);
}
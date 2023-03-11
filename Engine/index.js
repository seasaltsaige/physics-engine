window.onload = () => {
  /**
   * @type {HTMLCanvasElement}
   */
  const Window = document.getElementsByTagName("canvas")[0];
  Window.width = window.outerWidth;
  Window.height = window.outerHeight;

  const ctx = Window.getContext("2d");

  const soft = new SoftBodyObject({
    color: "black",
    x: 500,
    y: 500,
    // bounding box --- I should calculate this manually
    height: 200,
    width: 200,
    //----
    points: [
      { x: 23, y: 0 },
      { x: 100, y: 20 },
      { x: 150, y: 125 },
      { x: 0, y: 100 },
    ],
    z_index: 100,
  });

  soft.appendScripts([
    new SoftBody(soft, { fixed: false }),
    new SoftBodyCollider(soft),
  ]);

  // const block = new Square({
  //   x: Window.width / 2,
  //   y: 100,
  //   width: 100,
  //   height: 100,
  //   z_index: 100,
  //   color: "grey"
  // });

  // block.appendScripts([
  //   new RigidBody(block),
  //   new Collider(block),
  //   new Player(block),
  // ]);

  const floor = new SoftBodyObject({
    x: 0,
    y: Window.height * 2 / 3 - 50,
    z_index: 1,
    color: "brown",
    points: [
      { x: 0, y: 0 },
      { x: Window.width, y: 0 },
      { x: Window.width, y: 50 },
      { x: 0, y: 50 },

    ]
  });

  floor.appendScripts([
    new SoftBody(floor, { fixed: true }),
    new SoftBodyCollider(floor),
  ]);

  // const floor2 = new Square({
  //   x: Window.width / 2,
  //   y: Window.height * 2 / 3 - 225,
  //   height: 50,
  //   width: 300,
  //   z_index: 1,
  //   color: "brown",
  // });
  // floor2.appendScripts([
  //   new Collider(floor2),
  // ]);

  GameManager.ctx = ctx;
  GameManager.width = Window.width;
  GameManager.height = Window.height;
  GameManager.addObject(soft);
  // GameManager.addObject(block);
  GameManager.addObject(floor);
  // GameManager.addObject(floor2);

  renderLoop();
}


function renderLoop() {
  setInterval(() => {
    GameManager.render();
  }, 10);
}
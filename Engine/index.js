window.onload = () => {
  /**
   * @type {HTMLCanvasElement}
   */
  const Window = document.getElementsByTagName("canvas")[0];
  Window.width = window.outerWidth;
  Window.height = window.outerHeight;

  const ctx = Window.getContext("2d");


  const circlePoints = [];
  const pAmmount = 3;
  const step = Math.PI * 2 / pAmmount;

  for (let i = 2; i < Math.PI * 2 + 2; i += step) {
    const x = Math.cos(i) * 70;
    const y = Math.sin(i) * 70;
    circlePoints.push({ x, y });
  }

  // have to make both objects points react

  const soft = new SoftBodyObject({
    color: "black",
    x: 800,
    y: 200,
    points: circlePoints,
    mass: 50,
    k_constant: 10,
    z_index: 1,
  });

  soft.appendScripts([
    new SoftBody(soft, { fixed: false, elasticity: 0.575 }),
    new SoftBodyCollider(soft),
  ]);

  const soft2 = new SoftBodyObject({
    color: "black",
    x: 800,
    y: Window.height * 2 / 3 - 100,
    points: circlePoints,
    mass: 50,
    k_constant: 10,
    z_index: 1,
  });

  soft2.appendScripts([
    new SoftBody(soft2, { fixed: false, elasticity: 0.575 }),
    new SoftBodyCollider(soft2),
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
      { x: Window.width, y: -50 },
      { x: Window.width + 50, y: 50 },
      { x: 0, y: 50 },
    ],
    mass: 100,
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
  GameManager.addObject(soft2);
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
// window.onload = () => {
/**
 * @type {HTMLCanvasElement}
 */
const Window = document.getElementsByTagName("canvas")[0];
Window.width = window.outerWidth;
Window.height = window.outerHeight;

const ctx = Window.getContext("2d");

const rect = makeRect(400, 300, 2, 2, 100, 100);
rect.appendScripts([
  new SoftBody(rect, { fixed: false, elasticity: 0.5, }),
  new SoftBodyCollider(rect),
]);

const rect2 = makeRect(100, -100, 2, 2, 100, 100);
rect2.appendScripts([
  new SoftBody(rect2, { fixed: false, elasticity: 0.8, }),
  new SoftBodyCollider(rect2),
]);



const floor = makeRect(0, Window.height * 2 / 3, 5, 3, Window.width / 4, 50);


GameManager.ctx = ctx;
GameManager.width = Window.width;
GameManager.height = Window.height;
GameManager.addObject(rect);
GameManager.addObject(rect2);

GameManager.addObject(floor);

renderLoop();
// }


function renderLoop() {
  setInterval(() => {
    GameManager.render();
    console.log("hello?")
  }, 10);
}


/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w_count 
 * @param {number} h_count 
 * @param {number} spacing_x
 * @param {number} spacing_y
 */
function makeRect(x, y, w_count, h_count, spacing_x, spacing_y) {
  /**
   * @type {{x: number, y: number}[]}
   */
  const points = [];


  for (let h = 0; h < h_count; h++) {
    for (let w = 0; w < w_count; w++) {
      points.push({
        x: w * spacing_x, y: h * spacing_y,
      });
    }
  }


  const rect = new SoftBodyObject({
    color: "gold",
    mass: 50,
    k_constant: 5,
    points_x_amm: w_count,
    points_y_amm: h_count,
    points,
    x,
    y,
    z_index: 1,
  });

  return rect;
}

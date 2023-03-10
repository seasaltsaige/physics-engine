class GameObject {

  x;
  y;
  width;
  height;
  color;
  velocity = new Velocity(0, 0);

  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  onLoad() {

  }

  onRender() {

  }

}
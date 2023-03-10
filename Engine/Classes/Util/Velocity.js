class Velocity {

  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

}
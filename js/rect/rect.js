export default class Rect{
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.rect(this.x, this.y, this.w, this.h);
    context.fill();
    context.stroke();
  }
}
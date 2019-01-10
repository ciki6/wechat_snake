import Rect from '../rect/rect.js';

export default class Food extends Rect{
  constructor(snake) {
    super();
    //判定食物是否出现在蛇身上，如果是重合，则重新生成一遍
    var isOnSnake = true;

    this.w = this.h = 20;
    this.color = 'green';

    //设置食物出现的随机位置
    //食物只出现在上半部分
    this.x = this._getNumberInRange(0, canvas.width / 20 - 1) * 20;
    this.y = this._getNumberInRange(0, canvas.height / 20 - 8) * 20;
  }

  draw(snake, ctx) {
    this.isOnSnake = true;
    while(this.isOnSnake){
      for (var i = 0; i < snake.snakeArray.length; i++) {
        if (snake.snakeArray[i].x == this.x && snake.snakeArray[i].y == this.y) {
          //如果判定重合，将其设置为true，使随机数重绘
          this.x = this._getNumberInRange(0, canvas.width / 20 - 1) * 20;
          this.y = this._getNumberInRange(0, canvas.height / 20 - 8) * 20;
          break;
        }
      }
      this.isOnSnake = false;
      break;
    }
    super.draw(ctx);
  }
  _getNumberInRange(min, max) {
    var range = max - min;
    var r = Math.random();
    return Math.round(r * range + min)
  }
}
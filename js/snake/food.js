import Rect from '../rect/rect.js';

export default class Food extends Rect{
  constructor() {
    super();
    //判定食物是否出现在蛇身上，如果是重合，则重新生成一遍
    var isOnSnake = true;

    this.w = this.h = 20;
    this.color = 'green';

    //设置食物出现的随机位置
    while (isOnSnake) {
      //执行后先将判定条件设置为false，如果判定不重合，则不会再执行下列语句
      isOnSnake = false;
      this.x = this._getNumberInRange(0, canvas.width / 20 - 1);
      this.y = this._getNumberInRange(0, canvas.height / 20 - 1);
    }
  }

  _getNumberInRange(min, max) {
  var range = max - min;
  var r = Math.random();
  return Math.round(r * range + min)
}
}
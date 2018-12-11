import Rect from '../rect/rect.js';

export default class Food extends Rect{
  constructor() {
    super();
    //判定食物是否出现在蛇身上，如果是重合，则重新生成一遍
    var isOnSnake = true;

    //设置食物出现的随机位置
    while (isOnSnake) {
      //执行后先将判定条件设置为false，如果判定不重合，则不会再执行下列语句
      isOnSnake = false;
      var indexX = this._getNumberInRange(0, canvas.width / 20 - 1);
      var indexY = this._getNumberInRange(0, canvas.height / 20 - 1);
      var rect = new Rect(indexX * 20, indexY * 20, 20, 20, "green");
      
    }
  }

  _getNumberInRange(min, max) {
  var range = max - min;
  var r = Math.random();
  return Math.round(r * range + min)
}
}
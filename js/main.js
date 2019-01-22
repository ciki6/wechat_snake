import Snake from './snake/snake.js';
import Food from './snake/food.js';

let ctx = canvas.getContext('2d')

export default class Main {
  constructor() {
    this.start();
  }

  start() {
    let t = this;
    //定时器
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let snake = new Snake;
    let food = new Food;
    snake.draw(ctx);
    this._initTouchEvent(snake);
    var timer = setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      food.draw(snake, ctx);
      t.draw(food, snake, timer);
    }, 1000)
  }

  draw(food, snake, timer) {
    snake.move(food, timer, ctx);
  }

  _initTouchEvent(snake) {
    let startX, startY, endX, endY, direction;
    wx.onTouchStart(function(e) {
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
    });
    wx.onTouchEnd(function(e) {
      endX = e.changedTouches[0].pageX;
      endY = e.changedTouches[0].pageY;
      if (startX < endX - 100) {
        snake.direction = 'right';
      } else if (startX > endX + 100) {
        snake.direction = 'left';
      } else if (startY < endY - 100) {
        snake.direction = 'down';
      } else if (startY > endY + 100) {
        snake.direction = 'up';
      }
    })
  }
}
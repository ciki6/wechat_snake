import Snake from './snake/snake.js';
import Food from './snake/food.js';

let ctx = canvas.getContext('2d')

export default class Main {
  constructor() {
    this.start();
  }

  start() {
    let t= this;
    //定时器
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let snake = new Snake;
    let food = new Food;
    snake.draw(ctx);
    var timer = setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      food.draw(snake, ctx);
      t.draw(food,snake,timer);
    }, 1000)
  }

  draw(food,snake, timer) {
    snake.move(food,timer,ctx);
  }
}
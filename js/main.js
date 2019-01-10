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
    var timer = setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t.draw();
    }, 100)
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let snake = new Snake;
    snake.draw(ctx);
    let food = new Food;
    for (var i = 0; i < snake.snakeArray.length; i++) {
      if (snake.snakeArray[i].x == food.x && snake.snakeArray[i].y == food.y) {
        //如果判定重合，将其设置为true，使随机数重给
        food.isOnSnake = true;
        break;
      }
      food.draw(ctx);
      break;
    }
    snake.move(food);
  }
}
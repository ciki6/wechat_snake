import Rect from '../rect/rect.js'

export default class Snake {
  constructor() {
    //定义一个空数组存放组成整蛇的方块对象
    var snakeArray = [];

    //画出4个方块，设置成灰色
    for (var i = 0; i < 4; i++) {
      var rect = new Rect(i * 20, 0, 20, 20, "gray");
      //之所以用splice（往前加）而不是用push（往后加），是为了让蛇头出现在数组第一个位置
      snakeArray.splice(0, 0, rect);
    }

    //把数组第一个作为蛇头，蛇头设成红色
    var head = snakeArray[0];
    head.color = "red";

    //此处将两个后面常用的东西定为属性，方便后面调用
    this.head = snakeArray[0]; //蛇头
    this.snakeArray = snakeArray; //整蛇数组

    //给定初始位置向右(同keyCode右箭头)
    this.direction = 39;
  }

  draw(ctx) {
    for (var i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray[i].draw(ctx);
    }
  }

  move(food,timer,ctx) {
    //此处是核心部分，蛇的 移动方式
    //1、画一个灰色的方块，位置与蛇头重叠
    //2、将这个方块插到数组中蛇头后面一个的位置
    //3、砍去末尾的方块
    //4、将蛇头向设定方向移动一格
    var rect = new Rect(this.head.x, this.head.y, this.head.w, this.head.h, "gray");

    this.snakeArray.splice(1, 0, rect);
    
    

    //设置蛇头的运动方向，37 左，38 上，39 右，40 下
    switch (this.direction) {
      case 37:
        this.head.x -= this.head.w
        break;
      case 38:
        this.head.y -= this.head.h
        break;
      case 39:
        this.head.x += this.head.w
        break;
      case 40:
        this.head.y += this.head.h
        break;
      default:
        break;
    }

    //判断是否吃到食物，isEat判定函数写在最后了
    //吃到则食物重新给位置，不砍去最后一节，即蛇变长
    //没吃到则末尾砍掉一节，即蛇长度不变
    if (this._isEat(food)) {
      food = new getRandomFood();
    } else {
      this.snakeArray.pop();
    }

    this.draw(ctx);
    // gameover判定
    // 撞墙
    if (this.head.x + 20 >= canvas.width || this.head.x < 0 || this.head.y + 20 >= canvas.height || this.head.y < 0) {
      clearInterval(timer);
    }
    // 撞自己，循环从1开始，避开蛇头与蛇头比较的情况
    for (var i = 1; i < this.snakeArray.length; i++) {
      if (this.snakeArray[i].x == this.head.x && this.snakeArray[i].y == this.head.y) {
        clearInterval(timer);
      }
    };
  }

  _isEat(food) {
    if (this.head.x == food.x && this.head.y == food.y) {
      return true;
    } else {
      return false;
    }
  }
}
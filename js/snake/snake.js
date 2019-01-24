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
    //初始运动方向
    this.direction = 'right';
    this.crashDirection = [];//碰撞方向可能有多个
    this.crashed = false;
  }

  draw(ctx) {
    for (var i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray[i].draw(ctx);
    }
  }

  move(food, timer, ctx) {
    //检测是否碰撞，如果已经到边缘并且当前移动方向和到达边缘时候的方向相同则会碰撞
    if (this.crashed) {
      if (this.crashDirection.indexOf(this.direction) != -1) {
        //绘制当前碰撞状态，因为外面清除了画布
        this.draw(ctx);
        clearInterval(timer);
        return;
      } else {//改变了行动方向清除碰撞状态
        this.crashDirection = [];
        this.crashed = false;
      }
    }

    //此处是核心部分，蛇的 移动方式
    //1、画一个灰色的方块，位置与蛇头重叠
    //2、将这个方块插到数组中蛇头后面一个的位置
    //3、砍去末尾的方块
    //4、将蛇头向设定方向移动一格
    var rect = new Rect(this.head.x, this.head.y,    this.head.w, this.head.h, "gray");

    this.snakeArray.splice(1, 0, rect);
    

    switch (this.direction) {
      case 'left':
        this.head.x -= this.head.w
        break;
      case 'up':
        this.head.y -= this.head.h
        break;
      case 'right':
        this.head.x += this.head.w
        break;
      case 'down':
        this.head.y += this.head.h
        break;
      default:
        break;
    }

    //判断是否吃到食物，isEat判定函数写在最后了
    //吃到则食物重新给位置，不砍去最后一节，即蛇变长
    //没吃到则末尾砍掉一节，即蛇长度不变
    if (this._isEat(food)) {
      console.log('get!')
    } else {
      this.snakeArray.pop();
    }

    this.draw(ctx);
    // gameover判定
    // 撞墙
    if (this.head.x + 20 >= canvas.width) {
      if (this.crashDirection.indexOf('right') == -1) {
        this.crashDirection.push('right');
      }
      this.crashed = true;
    }
    if (this.head.x == 0) {
      if (this.crashDirection.indexOf('left') == -1) {
        this.crashDirection.push('left');
      }
      this.crashed = true;
    }
    if (this.head.y + 20 >= canvas.height) {
      if (this.crashDirection.indexOf('down') == -1) {
        this.crashDirection.push('down');
      }
      this.crashed = true;
    }
    if (this.head.y == 0) {
      if (this.crashDirection.indexOf('up') == -1) {
        this.crashDirection.push('up');
      }
      this.crashed = true;
    }
    // 撞自己，循环从1开始，避开蛇头与蛇头比较的情况
    //TODO:此处有误待修改,参见撞墙判定
    for (var i = 1; i < this.snakeArray.length; i++) {
      if (this.snakeArray[i].x == this.head.x && this.snakeArray[i].y == this.head.y) {
        this.crashDirection.push(this.direction);
        this.crashed = true;
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
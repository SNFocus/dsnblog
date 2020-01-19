/**
 * title: Canvas彩色气泡上升效果
 */

interface BubbleOption {
  radius: number[];
  color: null | undefined | string;
  speed: number;
}
interface BubbleInterface {
  x: number;
  y: number;
  r: number;
  option: BubbleOption;
}
class Bubble implements BubbleInterface {
  r: number = 0;
  color: string = "white";
  constructor(
    public x: number,
    public y: number,
    public option: {
      radius: number[];
      color: null | undefined | string;
      speed: number;
    }
  ) {
    this.setRandomRadius();
  }

  changeStatus(x: number, y: number, option: BubbleOption) {
    this.x = x;
    this.y = y;
    this.option = option;
    this.setRandomRadius();
    if (!option.color) {
      this.setRandomColor();
    }
  }

  setRandomRadius(): void {
    this.r =
      ~~(Math.random() * (this.option.radius[1] - this.option.radius[0])) +
      this.option.radius[0];
  }

  setRandomColor() {
    let alpha = Math.floor(Math.random() * 10 + 1) / 10;
    let randomColor = () => ~~(Math.random() * 255);
    this.color = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, ${alpha})`;
  }

  move(HEIGHT: number) {
    // speed 代表每秒移动的像素 为 1 ~ 100
    // requestAnimationFrame每秒执行60次 speed = realSpeed * 60
    // requestAnimationFrame相对速度(realSpeed)则是 speed / 60 => speed = realSpeed * 60
    // timeGap 设置动画间隔为50毫秒 则每秒执行 1000 / 50 = 20次 realSpeed = speed / 20
    let realSpeed = this.option.speed / 20;
    this.y -= realSpeed;
    if (this.y <= -10) {
      this.y = HEIGHT + 10;
    }
  }
}
export default class {
  presetOptions = {
    color: null,
    speed: 20,
    population: 40,
    radius: [5, 15]
  };

  timeGap = 50;
  itemList: any[] = [];
  animateID: number = 0;

  constructor(
    public ctx: any,
    public WIDTH: number,
    public HEIGHT: number,
    options = {}
  ) {
    Object.assign(this.presetOptions, options);
  }

  resetOptions(options: any) {
    this.stopAnimate();
    Object.assign(this.presetOptions, options);
    this.startAnimate();
  }

  drawItem(item: any) {
    this.ctx.fillStyle = item.color;
    this.ctx.shadowBlur = ~~(item.r + 5);
    this.ctx.shadowColor = item.color;
    this.ctx.beginPath();
    this.ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  autoPadding() {
    if (!(this.itemList && this.itemList.length)) {
      this.itemList = [];
    }
    let paddingNum = this.presetOptions.population - this.itemList.length;
    if (paddingNum > 0) {
      this.itemList.push(...new Array(paddingNum));
    } else if (this.itemList.length + paddingNum > 0) {
      for (let i = 0; i > paddingNum; i--) {
        this.deleteItem();
      }
    }
  }

  deleteItem() {
    let index: number = ~~(Math.random() * this.itemList.length);
    this.itemList.splice(index, 1);
  }

  itemAction(item: any) {
    item.move(this.HEIGHT);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.itemList.forEach(item => {
      this.itemAction(item);
      this.drawItem(item);
    });
    this.animateID = window.requestAnimationFrame(timestamp => {
      // 间隔 2s 检查 canvas是否还在文档流中 （vue 热更新时canvas的引用会过时，或许还有其他场景需要这个判断）
      if (timestamp - this.timeGap > 2000) {
        let hasCanvasDeleted = !window.document.body.contains(this.ctx.canvas);
        if (hasCanvasDeleted) {
          this.stopAnimate();
          return;
        }
        this.timeGap = timestamp;
      }
      this.animate.call(this);
    });
  }

  listInit() {
    this.autoPadding();
    for (let index = 0; index < this.presetOptions.population; index++) {
      let x = ~~(Math.random() * this.WIDTH);
      let y = ~~(Math.random() * this.HEIGHT);
      let item = this.itemList[index];
      if (item) {
        item.changeStatus(x, y, this.presetOptions);
      } else {
        this.itemList[index] = new Bubble(x, y, this.presetOptions);
      }
    }
  }

  startAnimate() {
    this.listInit();
    this.animate();
  }

  stopAnimate() {
    try {
      let cancelFunc =
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        (window as any).mozCancelAnimationFrame;
      cancelFunc(this.animateID);
    } catch (error) {
      console.warn(error);
    }
  }
}

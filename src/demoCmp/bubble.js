class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = ~~(Math.random() * 18) + 1;

        let alpha = Math.floor(Math.random() * 10 + 1) / 10;
        let randomColor = () => ~~(Math.random() * 255);
        this.color = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, ${alpha})`;
    }

    move(HEIGHT) {
        this.y -= 0.2;
        if (this.y <= -10) {
            this.y = HEIGHT + 10;
        }
    }
}

export default class {

    constructor(ctx, WIDTH, HEIGHT, population) {
        this.ctx = ctx;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.population = population;
        this.itemList = new Array(population);
    }

    drawItem(item) {
        this.ctx.fillStyle = item.color;
        this.ctx.shadowBlur = item.r * 2;
        this.ctx.beginPath();
        this.ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    listInit() {
        for (let index = 0; index < this.population; index++) {
            let x = ~~(Math.random() * this.WIDTH),
                y = ~~(Math.random() * this.HEIGHT),
                bubble = new Bubble(x, y);
            this.itemList[index] = bubble;
            this.drawItem(bubble);
        }
        return this;
    }

    itemAction(item) {
        item.move(this.HEIGHT);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.itemList.forEach(item => {
            this.itemAction(item);
            this.drawItem(item);
        });
        requestAnimationFrame(this.animate.bind(this));
    }

    startAnimate(){
        this.listInit();
        this.animate();
    }
}
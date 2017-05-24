/**
 * @constructor 鸟类
 * @param { options: Object }
 * @param { options.ctx: Context }
 * @param { options.img: Image }
 * @param { options.x: number }
 * @param { options.y: number }
 * @param { options.w: number }
 * @param { options.h: number }
 * @param { options.speed: number }
 * @param { options.speedA: number } 加速度
 * */
function Bird(options) {
	this.ctx = options.ctx;
	this.img = options.img;
	this.x = options.x || 10;
	this.y = options.y || 10;
	this.w = options.w;
	this.h = options.h;
	this.speed = options.speed || 4;
	this.speedA = options.speedA || 0.4;

	// 控制小鸟第几帧
	this.index = 0;

	// 事件绑定只需绑定一次，所以就在内部帮用户调用了
	this.onClick();
	// 小鸟旋转角度
	this.rotateRadian = 0;
}

Bird.prototype = {

	// 绘制小鸟，更根据小鸟的速度进行对应的旋转
	draw: function () {
		/*
		 * 1、在该方法的前面先save，最后面restore，防止旋转对其他图形造成影响
		 * */
		this.ctx.save();
		this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
		this.rotateRadian = this.speed * Math.PI / 40;
		this.ctx.rotate(this.rotateRadian);
		this.ctx.drawImage(this.img, this.w * this.index, 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

		this.ctx.restore();
	},

	update: function () {

		// 更新这俩数据是为了让小鸟下落
		this.y += this.speed;
		this.speed += this.speedA;

		// 更新这个数据是为了让小鸟翅膀挥动
		this.index = ++this.index % 3;
	},

	onClick: function () {
		var that = this;

		// 给canvasDOM元素绑定点击事件
		this.ctx.canvas.onclick = function () {
			that.speed = -6;
		};
	}
}
/**
 * @constructor 背景类
 * @param { options: Object } 可选参数
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 背景图
 * @param { options.x: number } 背景图在画布中的x坐标
 * @param { options.y: number } 背景图在画布中的y坐标
 * @param { options.speed: number } 背景运动速度
 * */
(function (window) {
	var skyTotal = 0;

	function Sky(options) {
		this.ctx = options.ctx;
		this.img = options.img;
		this.x = typeof options.x != 'undefined' ? options.x : 10;
		this.y = typeof options.y != 'undefined' ? options.y : 10;
		this.speed = options.speed || 4;

		skyTotal++;
	}

	Sky.prototype = {
		constructor: Sky,

		// 按照现有的数据，把背景绘制到画布中
		draw: function () {
			this.ctx.drawImage(this.img, this.x, this.y);
			this.ctx.rect(this.x, this.y, this.img.width, -this.img.height);
			this.ctx.stroke();
		},

		// 更新数据
		update: function () {
			this.x -= this.speed;

			// 如果背景走出画布，向右拼接
			if (this.x < -this.img.width) {
				this.x += this.img.width * skyTotal;
			}
		}
	};

	window.Sky = Sky;
})(window);
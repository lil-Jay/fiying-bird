/**
 * @constructor 大地类
 * @param { options: Object } 可选参数
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 图
 * @param { options.x: number } 在画布中的x坐标
 * @param { options.y: number } 在画布中的y坐标
 * @param { options.speed: number } 运动速度
 * */

// 使用沙箱模式，防止过多的全局变量污染，内部只需要把构造函数返回到外界即可
var Land = (function() {
	
	// 用来统计大地实例总量的变量
	var landTotal = 0;

	function Land(options) {
		// 抽取一个对象的属性，通常是根据这个对象的功能来抽取的
		this.ctx = options.ctx;
		this.img = options.img;
		this.x = options.x;
		this.y = options.y;
		this.speed = options.speed || 4;
		
		landTotal++;
	}
	
	// 为了代码的复用，内存的节省，所以把实例相同的功能封装成一个个方法添加到构造函数的原型中
	Land.prototype = {
		
		// 按照实例当前的属性把大地绘制到画布中
		draw: function() {
			this.ctx.drawImage(this.img, this.x, this.y);
			this.ctx.rect(this.x, this.y,this.img.width,this.img.height);
		},
		
		// 更新属性值，下一次绘制的时候就会按照新的属性值来绘制
		update: function() {
			this.x -= this.speed;
			
			// 当大地从左边走出画布时，要向右紧挨着最后一个大地拼接，那么就需要获取到大地的数量
			if(this.x < -this.img.width) {
				this.x += this.img.width * landTotal;
			}
		}
	};

	return Land;

})();

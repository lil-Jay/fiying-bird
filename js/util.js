var util = {
	/**
	 * @function 图片加载器
	 * @param { imgSrcs: Object } 该对象以键值对的方式存储所有要加载的图片src
	 * @param { fn: function } 当所有的图片都加载完毕后，这个回调会被执行，同时会把所有的加载好的图片传给回调使用
	 * */
	loadImgs: function(imgSrcs, fn) {
		/**
		 * 1、定义一个用来存储所有图片的对象
		 * 2、定义一个用来统计图片已加载个数的变量，再定义一个用来统计所有src数量的变量
		 * 3、遍历所有的src，依次创建image对象，然后存储起来
		 * 4、在遍历的过程中，还需要计算出所有src的数量
		 * 5、在遍历的过程中，每 创建一个img，都要监听它的load事件
		 * 6、load事件的回调中，需要对已加载的变量自增，自增后判断这个值有没有达到src的总数，到达则执行回调，把所有的img传递过去
		 * */
		var imgObjs = {};
		var imgLoadedTotal = 0, imgTotal = 0;
		
		for(var key in imgSrcs) {
			imgObjs[key] = new Image();
			imgObjs[key].src = imgSrcs[key];
			
			imgTotal++;
			
			// 事件回调的执行是异步的，异步的东西会等到同步代码执行完毕后执行。
			imgObjs[key].onload = function() {
				if(++imgLoadedTotal >= imgTotal) {
					fn(imgObjs);
				}
			};
		}
	}
};

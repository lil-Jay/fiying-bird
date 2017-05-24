(function (window) {
    function Timer(options) {
        this.ctx = options.ctx;
        this.x = options.x || this.ctx.canvas.width;
        this.y = options.y || 0;
        this.textAlign = options.textAlign || 'right';
        this.textBaseline = options.textBaseline || 'top';
        this.fontColor = options.fontColor || 'red';
        this.font = options.font || 'bold 28px Microsoft Yahei';

        this.startTime = Date.now();
        this.text = '恭喜,您已经坚持了0小时0分钟0秒！';
    }

    Timer.prototype = {
        draw: function () {
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.fontColor;

            // 文字绘制 
            this.ctx.fillText(this.text, this.x, this.y);
        },
        update: function () {
            var duration = Date.now() - this.startTime;

            var hour = Math.floor(duration / (1000 * 60 * 60));
            var min = Math.floor(duration % (1000 * 60 * 60) / (60 * 1000));
            var sec = Math.floor(duration % (60 * 1000) / 1000);
            var dec = this.toDec((duration % (60 * 1000) / 1000));
            // var dec = (duration / 1000).toFixed(1); //取小数点后几位的原生方法 
            this.text = '恭喜,您已经坚持了' + hour + '小时' + min + '分钟' + dec + '秒！'
        },
        toDec: function (n) {//获取小数点后一位方法 
            var dec = Math.round(n * 10) / 10;
            if (dec % 1 == 0) {//当数字为整数时，不会改变字符串长度
                dec = dec+'.0';
            }
                return dec;
        }
    }
    window.T = Timer;
})(window)
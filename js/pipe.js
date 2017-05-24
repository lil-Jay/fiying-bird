(function (w) {
    var pipetotal = 0;

    function Pipe(options) {
        this.ctx = options.ctx;
        this.imgPipeDown = options.imgPipeDown;
        this.imgPipeUp = options.imgPipeUp;

        this.x = options.x || 150;
        this.yPipeUp = options.yPipeUp || 0;
        this.yPipeDown = options.yPipeDown || 0;

        this.maxHeight = 200;
        this.minHeight = 50;

        this.UDSpace = 150;
        this.LRSpace = 100;

        this.speed = options.speed || 4;
        this.speedA = options.speedA || 0.01;

        this.getPipeY()
        pipetotal++;
    };
    Pipe.prototype = {
        getPipeY: function () {
            var pipeDownHeight = Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;
            this.yPipeDown = pipeDownHeight - this.imgPipeDown.height;
            this.yPipeUp = pipeDownHeight + this.UDSpace;
        },

        draw: function () {
            this.ctx.drawImage(this.imgPipeDown, this.x, this.yPipeDown);
            this.ctx.drawImage(this.imgPipeUp, this.x, this.yPipeUp);

            this.ctx.rect(this.x, this.yPipeDown, this.imgPipeDown.width, this.imgPipeDown.height);
            this.ctx.rect(this.x, this.yPipeUp, this.imgPipeUp.width, this.imgPipeUp.height);
        },

        update: function () {
            this.x -= this.speed;
            this.speed += this.speedA;

            if (this.x < -this.imgPipeDown.width) {
                this.x += (this.imgPipeDown.width + this.LRSpace) * pipetotal;
                this.getPipeY();
            }
        }
    }
    w.Pipe = Pipe;
})(window)
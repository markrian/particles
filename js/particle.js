define(function () {
    function Particle(ctx, x, y, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.timestamp = 0;
    }

    Particle.prototype.draw = function draw() {
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(this.x, this.y, 5, 5);
    };

    Particle.prototype.update = function update(timestamp) {
        var dt = timestamp - this.timestamp;
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        this.timestamp = timestamp;
    };

    return Particle;
});
define(["random"], function (random) {
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
        if (this.isOffscreen()) {
            return this.randomise();
        }

        var dt = timestamp - this.timestamp;
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        this.timestamp = timestamp;
    };

    Particle.prototype.randomise = function randomise() {
        this.x = random.between(0, this.ctx.canvas.width);
        this.y = random.between(0, this.ctx.canvas.height);
    };

    Particle.prototype.isOffscreen = function isOffscreen() {
        return (
            this.x < 0 ||
            this.x > this.ctx.canvas.width ||
            this.y < 0 ||
            this.y > this.ctx.canvas.height
        );
    };

    return Particle;
});
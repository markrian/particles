define(["random"], function (random) {
    function Particle(ctx, x, y, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.timestamp = 0;

        this.red = this._toColour(this.speed());
        this.size = this.red / 10;
        this.fillStyle = "rgb(" + this.red + ",0,0)";
    }

    Particle.prototype.draw = function draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        this.ctx.fill();
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

    Particle.prototype.speed = function speed() {
        return Math.sqrt(this.vx*this.vx + this.vy*this.vy);
    };

    Particle.prototype.randomise = function randomise() {
        this.x = random.between(0, this.ctx.canvas.width);
        this.y = random.between(0, this.ctx.canvas.height);
    };

    Particle.prototype.isOffscreen = function isOffscreen() {
        return (
            this.x + this.size < 0 ||
            this.x - this.size > this.ctx.canvas.width ||
            this.y + this.size < 0 ||
            this.y - this.size > this.ctx.canvas.height
        );
    };

    Particle.prototype._toColour = function _toColour(s) {
        var H = 255;
        var V = 70.7;
        var a = H / (V*V);

        var h = a*s*s;

        if (h > H) {
            h = H;
        } else if (h < 0) {
            h = 0;
        }

        return Math.floor(h);
    };

    return Particle;
});
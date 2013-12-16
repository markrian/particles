define(["random", "extend"], function (random, extend) {
    function Particle(ctx, x, y, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.timestamp = 0;

        this._updateProps();
    }

    Particle.prototype.draw = function draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        this.ctx.fill();
    };

    Particle.prototype.update = function update(timestamp) {
        var dt = timestamp - this.timestamp;
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        this.timestamp = timestamp;

        this.bounce();

        this._updateProps();
    };

    Particle.prototype.speed = function speed() {
        return Math.sqrt(this.vx*this.vx + this.vy*this.vy);
    };

    Particle.prototype.randomise = function randomise() {
        this.x = random.between(0, this.ctx.canvas.width);
        this.y = random.between(0, this.ctx.canvas.height);
    };

    Particle.prototype.setProps = function (props) {
        extend(this, props);
    };

    Particle.prototype.bounce = function bounce() {
        var e = 0.8;
        if (this.x - this.size < 0) {
            this.x = this.size;
            this.vx = -this.vx*e;
        }
        if (this.x + this.size > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.size;
            this.vx = -this.vx*e;
        }
        if (this.y - this.size < 0) {
            this.y = this.size;
            this.vy = -this.vy*e;
        }
        if (this.y + this.size > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.size;
            this.vy = -this.vy*e;
        }
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

    Particle.prototype._updateProps = function _updateProps() {
        this.red = this._toColour(this.speed());
        this.size = this.red / 10;
        this.fillStyle = "rgb(" + this.red + ",0,0)";
    };

    return Particle;
});
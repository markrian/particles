define(function () {
    function Particle(x, y) {
        this.x = x;
        this.y = y;
    }

    Particle.prototype.draw = function draw(ctx) {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(this.x, this.y, 5, 5);
    };

    return Particle;
});
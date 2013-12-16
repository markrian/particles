define(function () {
    function RadialForce(ctx, x, y, strength) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.strength = strength;
    }

    RadialForce.prototype.resolve = function (particle, dt) {
        var direction = [
            particle.x - this.x,
            particle.y - this.y
        ];
        var distance_squared = direction[0] * direction[0] + 
            direction[1] * direction[1];

        var fx = this.strength * direction[0] / distance_squared;
        var fy = this.strength * direction[1] / distance_squared;
        particle.vx += fx;
        particle.vy += fy;
    };

    return RadialForce;
});
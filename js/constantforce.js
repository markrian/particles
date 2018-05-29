define(() => {
    function ConstantForce(fx, fy) {
        this.fx = fx;
        this.fy = fy;
    }

    ConstantForce.prototype.resolve = function (particle, dt) {
        particle.vx += this.fx;
        particle.vy += this.fy;
    };

    ConstantForce.prototype.draw = function () {};

    return ConstantForce;
});

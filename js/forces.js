define({
    _forces: [],
    add: function add(forces) {
        for (let i = 0; i < forces.length; i++) {
            this._forces.push(forces[i]);
        }
    },
    draw: function draw() {
        for (let i = 0; i < this._forces.length; i++) {
            this._forces[i].draw();
        }
    },
    resolve: function resolve(particle, dt) {
        // F = m*a;
        // a = F / m;
        // dv / dt = F / m
        // dv = F * dt / m

        // a.b = |a||b|cos(theta);

        const count = this._forces.length;
        for (let i = 0; i < count; i++) {
            // Var _r_ = [
            //     force.x - particle.x,
            //     force.y - particle.y
            // ];
            // var r_squared = _r_[0] * _r_[0] + _r_[1] * _r_[1];
            // var F = force.strength;
            // var Fx = F * _r_[0] / r_squared;

            const force = this._forces[i];
            force.resolve(particle, dt);
        }
    },
});

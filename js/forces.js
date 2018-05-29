export default {
    _forces: [],
    add(forces) {
        this._forces.push(...forces);
    },
    draw() {
        for (const force of this._forces) {
            force.draw();
        }
    },
    resolve(particle, dt) {
        // F = m*a;
        // a = F / m;
        // dv / dt = F / m
        // dv = F * dt / m

        // a.b = |a||b|cos(theta);

        for (const force of this._forces) {
            // Var _r_ = [
            //     force.x - particle.x,
            //     force.y - particle.y
            // ];
            // var r_squared = _r_[0] * _r_[0] + _r_[1] * _r_[1];
            // var F = force.strength;
            // var Fx = F * _r_[0] / r_squared;

            force.resolve(particle, dt);
        }
    },
}

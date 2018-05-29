export default class ConstantForce {
    constructor(fx, fy) {
        this.fx = fx;
        this.fy = fy;
    }

    resolve(particle, /* dt */) {
        particle.vx += this.fx;
        particle.vy += this.fy;
    }

    draw() {}
}

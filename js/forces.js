import List from './list.js';

const MASS_FACTOR = 100;

class Forces extends List {
}

export default new Forces();

// F = m*a
// a = F / m
// dv/dt = F / m
// dv = F*dt / m
export class ConstantForce {
    constructor(fx, fy) {
        this.fx = fx;
        this.fy = fy;
    }

    update(dt, state) {
    }

    resolve(particle, dt) {
        particle.vx += this.fx * dt / particle.mass;
        particle.vy += this.fy * dt / particle.mass;
    }

    draw() {
    }
}

export class RadialForce {
    constructor(ctx, x, y, mass) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.mass = mass;
    }

    update(dt, state) {
        if (false) {
            this.x = state.mouse.x;
            this.y = state.mouse.y;
        }
    }

    resolve(particle, dt) {
        const direction = [
            particle.x - this.x,
            particle.y - this.y,
        ];
        const distanceSquared = direction[0] * direction[0] +
            direction[1] * direction[1];
        const distance = Math.sqrt(distanceSquared);

        // From a = GM/r^2
        const a = MASS_FACTOR * this.mass / distanceSquared;

        // Scale direction vector to acceleration vector
        const ax = a * direction[0] / distance;
        const ay = a * direction[1] / distance;

        particle.vx += ax * dt;
        particle.vy += ay * dt;
    }

    draw() {
        const absMass = Math.abs(this.mass);
        const radialGradient = this.ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            absMass,
        );
        const color = this.direction === -1 ? '0,127,0' : '127,0,0';
        radialGradient.addColorStop(0, 'rgba(' + color + ',1)');
        radialGradient.addColorStop(1, 'rgba(' + color + ',0)');
        this.ctx.fillStyle = radialGradient;
        this.ctx.fillRect(this.x - absMass, this.y - absMass, absMass * 2, absMass * 2);
    }
}

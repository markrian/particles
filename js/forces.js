import List from './list.js';
import { drawDisc } from './canvas.js';

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
    constructor(ctx, x, y, strength) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.direction = strength >= 0 ? 1 : -1;
        this.strength = Math.abs(strength);
    }

    update(dt, state) {
        if (this.direction < 0) {
            this.x = state.mouse.x;
            this.y = state.mouse.y;
        }
    }

    resolve(particle, dt) {
        const direction = [
            particle.x - this.x,
            particle.y - this.y,
        ];
        let distanceSquared = direction[0] * direction[0] +
            direction[1] * direction[1];

        // f = GMm/r^2
        // ma = Sm/r^2
        // dv = S*dt/r^2
        const fx = this.strength * this.direction * direction[0] / distanceSquared;
        const fy = this.strength * this.direction * direction[1] / distanceSquared;
        particle.vx += fx * dt;
        particle.vy += fy * dt;
    }

    draw() {
        const radialGradient = this.ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.strength,
        );
        const color = this.direction === -1 ? '0,127,0' : '127,0,0';
        radialGradient.addColorStop(0, 'rgba(' + color + ',1)');
        radialGradient.addColorStop(1, 'rgba(' + color + ',0)');
        this.ctx.fillStyle = radialGradient;
        this.ctx.fillRect(this.x - this.strength, this.y - this.strength, this.strength * 2, this.strength * 2);
    }
}

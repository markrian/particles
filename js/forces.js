import List from './list.js';
import { drawReticle } from './canvas.js';

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
        if (state.mouse.dragging && state.draggingItem === this) {
            this.x = state.mouse.x;
            this.y = state.mouse.y;
        }

        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;
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
        const colour = this.hovered ? 160 : 127;
        const absMass = Math.abs(this.mass);
        const radialGradient = this.ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            absMass,
        );
        const rgb = this.mass >= 0 ? `0,${colour},0` : `${colour},0,0`;
        radialGradient.addColorStop(0, 'rgba(' + rgb + ',1)');
        radialGradient.addColorStop(1, 'rgba(' + rgb + ',0)');
        this.ctx.fillStyle = radialGradient;
        this.ctx.fillRect(this.x - absMass, this.y - absMass, absMass * 2, absMass * 2);

        if (this.selected) {
            drawReticle(this.ctx, this.x, this.y);
        }
    }
}

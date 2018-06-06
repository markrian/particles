import List from './list.js';
import { drawReticle } from './canvas.js';

const MASS_FACTOR = 100;
const HALF_PI = Math.PI / 2;

class Forces extends List {
}

export default new Forces();

// F = m*a
// a = F / m
// dv/dt = F / m
// dv = F*dt / m
export class ConstantForce {
    constructor(ctx, fx, fy) {
        this.ctx = ctx;
        this.x = 40;
        this.y = 40;
        this.fx = fx;
        this.fy = fy;
        this.name = 'constant-force';
    }

    get angle() {
        if (this.fx === 0) return this.fy > 0 ? HALF_PI : -HALF_PI;
        return Math.atan(this.fy / this.fx);
    }

    set angle(value) {
        const strength = this.strength;
        this.fx = strength * Math.cos(value);
        this.fy = strength * Math.sin(value);
    }

    get strength() {
        return Math.sqrt(this.fx * this.fx + this.fy * this.fy);
    }

    set strength(value) {
        const angle = this.angle;
        this.fx = value * Math.cos(angle);
        this.fy = value * Math.sin(angle);
    }

    update(dt, state) {
        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;
    }

    resolve(particle, dt) {
        particle.vx += this.fx * dt / particle.mass;
        particle.vy += this.fy * dt / particle.mass;
    }

    draw() {
        const F = 3;
        const length = F * this.strength;
        const headSize = Math.max(3, length / 10);

        this.ctx.save();

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);

        this.ctx.beginPath();

        this.ctx.moveTo(-length / 2, 0);
        this.ctx.lineTo(length / 2, 0);
        this.ctx.translate(length / 2, 0);
        // this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-headSize, -headSize);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-headSize, headSize);

        this.ctx.strokeStyle = this.hovered ? 'red' : 'black';
        this.ctx.stroke();

        this.ctx.restore();

        if (this.selected) {
            drawReticle(this.ctx, this.x, this.y);
        }
    }
}

export class RadialForce {
    constructor(ctx, x, y, mass) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.name = 'radial-force';
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

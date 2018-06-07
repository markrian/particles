import List from './list.js';
import { drawReticle } from './canvas.js';

const MASS_FACTOR = 50000;
const HALF_PI = Math.PI / 2;

class Forces extends List {
}

export default new Forces();

// F = m*a
// a = F / m
// dv/dt = F / m
// dv = F*dt / m
export class ConstantForce {
    constructor(world, angle, strength, x = 40, y = 40) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.strength = strength;
        this.name = 'constant-force';
    }

    get angle() {
        return this._angle;
    }

    set angle(value) {
        this._angle = value;
        this.fx = this._strength * Math.cos(this._angle);
        this.fy = this._strength * Math.sin(this._angle);
    }

    get strength() {
        return this._strength;
    }

    set strength(value) {
        this._strength = value;
        this.fx = this._strength * Math.cos(this._angle);
        this.fy = this._strength * Math.sin(this._angle);
    }

    remove() {
        this.world.remove(this);
    }

    update(dt, state) {
        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;

        if (state.keys.pressed.d && this.selected) {
            this.remove();
            return;
        }

        if (state.mouse.dragging && state.draggingItem === this) {
            this.x = state.mouse.x;
            this.y = state.mouse.y;
        }
    }

    resolve(particle, dt) {
        particle.vx += this.fx * dt / particle.mass;
        particle.vy += this.fy * dt / particle.mass;
    }

    draw() {
        const STRENGTH_FACTOR = .025;
        const length = STRENGTH_FACTOR * this.strength;
        const headSize = Math.max(3, length / 10);

        this.world.ctx.save();

        this.world.ctx.translate(this.x, this.y);
        this.world.ctx.rotate(this.angle);

        this.world.ctx.beginPath();

        this.world.ctx.moveTo(-length / 2, 0);
        this.world.ctx.lineTo(length / 2, 0);
        this.world.ctx.translate(length / 2, 0);
        this.world.ctx.lineTo(-headSize, -headSize);
        this.world.ctx.moveTo(0, 0);
        this.world.ctx.lineTo(-headSize, headSize);

        this.world.ctx.strokeStyle = this.hovered ? 'red' : 'black';
        this.world.ctx.stroke();

        this.world.ctx.restore();

        if (this.selected) {
            drawReticle(this.world.ctx, this.x, this.y);
        }
    }
}

export class RadialForce {
    constructor(world, x, y, mass) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.name = 'radial-force';
    }

    remove() {
        this.world.remove(this);
    }

    update(dt, state) {
        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;

        if (state.keys.pressed.d && this.selected) {
            this.remove();
            return;
        }

        if (state.mouse.dragging && state.draggingItem === this) {
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
        const colour = this.hovered ? 160 : 127;
        const absMass = Math.abs(this.mass);
        const radialGradient = this.world.ctx.createRadialGradient(
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
        this.world.ctx.fillStyle = radialGradient;
        this.world.ctx.fillRect(this.x - absMass, this.y - absMass, absMass * 2, absMass * 2);

        if (this.selected) {
            drawReticle(this.world.ctx, this.x, this.y);
        }
    }
}

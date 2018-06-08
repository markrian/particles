import forces from './forces.js';
import { pointInRect } from './geometry.js';
import { drawDisc } from './canvas.js';
import { warn } from './log.js';

export default class Particle {
    constructor(ctx, x, y, vx, vy) {
        this.constructor.init(this, ...arguments);
    }

    static init(particle, ctx, x, y, vx, vy) {
        particle.ctx = ctx;
        particle.x = x;
        particle.y = y;
        particle.vx = vx;
        particle.vy = vy;
        particle.radius = 1.5;
        particle.mass = particle.radius * particle.radius;
        particle.inView = true;
    }

    update(dt, state) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        forces.call('resolve', this, dt);

        this.inView = pointInRect(
            this,
            -this.radius,
            -this.radius,
            state.width + 2 * this.radius,
            state.height + 2 * this.radius,
        );
    }

    draw() {
        if (!this.inView) {
            return;
        }

        drawDisc(this.ctx, this.x, this.y, this.radius, 'black');
    }

    speed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }
}

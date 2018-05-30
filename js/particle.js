import forces from './forces.js';
import { pointInRect } from './collision.js';
import { fillCircle } from './canvas.js';
import { warn } from './log.js';

export default class Particle {
    constructor(ctx, parent, x, y, vx, vy) {
        this.ctx = ctx;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 10;
        this.mass = this.size * this.size;
        this.inView = true;
    }

    update(dt, state, indexInParent) {
        forces.resolve(this, dt);
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        this.inView = pointInRect(
            this.x,
            this.y,
            -this.radius,
            -this.radius,
            state.width + 2 * this.radius,
            state.height + 2 * this.radius,
        );

        if (!this.inView && this.parent !== undefined) {
            this.parent.splice(indexInParent, 1);
        }
    }

    draw() {
        if (!this.inView) {
            warn('entered particle.draw, but did not in view!');
            return;
        }

        fillCircle(this.ctx, this.x, this.y, this.radius, 'black');
    }

    speed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    setProps(props) {
        Object.assign(this, props);
    }
}

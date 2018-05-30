import forces from './forces.js';
import { pointInRect } from './collision.js';
import { drawDisc } from './canvas.js';
import { warn } from './log.js';

export default class Particle {
    constructor(ctx, parent, x, y, vx, vy) {
        this.ctx = ctx;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 1;
        this.mass = this.radius * this.radius;
        this.inView = true;

        this.netForce = [0,0];
    }

    update(dt, state, indexInParent) {
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        forces.call('resolve', this, dt);

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

        drawDisc(this.ctx, this.x, this.y, this.radius, 'black');

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'blue';
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.netForce[0]*10000, this.y + this.netForce[1]*10000);
        this.ctx.stroke();
    }

    speed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    setProps(props) {
        Object.assign(this, props);
    }
}

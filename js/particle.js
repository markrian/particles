import forces from './forces.js';
import { pointInRect } from './collision.js';

export default class Particle {
    constructor(ctx, parent, x, y, vx, vy) {
        this.ctx = ctx;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = 1;
        this.mass = this.size * this.size;
        this.inView = true;
    }

    update(dt, state, indexInParent) {
        forces.resolve(this, dt);
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        this.inView = pointInRect(this.x, this.y, 0, 0, state.width, state.height);

        if (!this.inView && this.parent !== undefined) {
            this.parent.splice(indexInParent, 1);
        }
    }

    draw() {
        if (!this.inView) {
            console.log('entered particle.draw, but did not in view!');
            return;
        }

        this.ctx.fillStyle = 'rgb(0,0,0)';
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    speed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    setProps(props) {
        Object.assign(this, props);
    }
}

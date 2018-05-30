import * as random from './random.js';
import extend from './extend.js';
import forces from './forces.js';

export default class Particle {
    constructor(ctx, x, y, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = 1;
        this.mass = this.size * this.size;
    }

    draw() {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update(dt) {
        forces.resolve(this, dt);
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
    }

    speed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    randomise() {
        this.x = random.between(0, this.ctx.canvas.width);
        this.y = random.between(0, this.ctx.canvas.height);
    }

    setProps(props) {
        extend(this, props);
    }
}

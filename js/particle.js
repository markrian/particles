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
        this.timestamp = 0;

        this._preDraw();
    }

    _preDraw() {
        const c = this._canvas = document.createElement('canvas');
        c.width = c.height = this.size * 2;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, this.size * 2, this.size * 2);
    }

    draw() {
        this.ctx.drawImage(this._canvas, this.x - this.size, this.y - this.size);
    }

    update(timestamp) {
        const dt = timestamp - this.timestamp;
        forces.resolve(this, dt);
        this.x += this.vx * dt / 1000;
        this.y += this.vy * dt / 1000;
        this.timestamp = timestamp;

        // This.bounce();
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

    bounce() {
        const e = 1;
        if (this.x - this.size < 0) {
            this.x = this.size;
            this.vx = -this.vx * e;
        }
        if (this.x + this.size > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.size;
            this.vx = -this.vx * e;
        }
        if (this.y - this.size < 0) {
            this.y = this.size;
            this.vy = -this.vy * e;
        }
        if (this.y + this.size > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.size;
            this.vy = -this.vy * e;
        }
    }
}

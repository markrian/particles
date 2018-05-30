import Particle from './particle.js';
import * as random from './random.js';

export default class Emitter {
    constructor(
        ctx,
        x,
        y,
        frequency,
        number,
        speed,
        startAngle,
        endAngle
    ) {
        this.x = x;
        this.y = y;
        this.frequency = frequency;
        this.speed = speed;
        this.pool = [];
        this.particles = [];
        this.ctx = ctx;
        this.number = number;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this._initParticles(number);
    }

    update(dt) {
        this.emit(dt);

        for (const particle of this.particles) {
            particle.update(dt);
        }
    }

    draw() {
        for (const particle of this.particles) {
            particle.draw();
        }
    }

    emit(dt) {
        const toEmit = Math.floor(this.frequency * dt / 1000);
        for (let i = 0; i < toEmit; i++) {
            this._emit();
        }
    }

    _emit() {
        const particle = this._nextParticle();
        const angle = random.betweenFloat(this.startAngle, this.endAngle);

        particle.setProps({
            x: this.x,
            y: this.y,
            vx: this.speed * Math.cos(angle),
            vy: this.speed * Math.sin(angle),
        });
    }

    _nextParticle() {
        let particle;
        this._current = this._current || 0;

        if (this.pool.length > 0) {
            particle = this.pool.pop();
            this.particles.push(particle);
        } else {
            particle = this.particles[this._current % this.number];
            this._current++;
        }

        return particle;
    }

    _initParticles(number) {
        while (number-- > 0) {
            this.pool.push(
                new Particle(this.ctx, 0, 0, 0, 0)
            );
        }
    }
}

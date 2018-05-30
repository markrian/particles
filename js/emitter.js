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
        this.particles = [];
        this.ctx = ctx;
        this.number = number;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    update(dt, state) {
        this.emit(dt);

        let i = this.particles.length;
        while (i-- > 0) {
            this.particles[i].update(dt, state, i);
        }
    }

    draw() {
        let count = 0;
        for (const particle of this.particles) {
            if (particle.inView) count++;
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
        const angle = random.betweenFloat(this.startAngle, this.endAngle);

        const particle = new Particle(
            this.ctx,
            this.particles,
            this.x,
            this.y,
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle),
        );

        this.particles.push(particle);
    }
}

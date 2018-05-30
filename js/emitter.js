import Particle from './particle.js';
import * as random from './random.js';

export default class Emitter {
    constructor(
        ctx,
        x,
        y,
        frequency,
        speed,
        startAngle,
        endAngle
    ) {
        this.x = x;
        this.y = y;
        this.msPerEmission = 1000 / frequency;
        this.msToNextEmission = this.msPerEmission;
        this.speed = speed;
        this.particles = [];
        this.ctx = ctx;
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
        for (const particle of this.particles) {
            particle.draw();
        }
    }

    emit(dt) {
        if (this.msPerEmission < dt) {
            let elapsed = 0;
            while (elapsed < dt) {
                this._emit();
                elapsed += this.msPerEmission;
            }
        } else if (this.msToNextEmission <= 0) {
            this._emit();
            this.msToNextEmission = this.msPerEmission;
        } else {
            this.msToNextEmission -= dt;
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

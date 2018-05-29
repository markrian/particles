import Particle from './particle.js';
import random from './random.js';

export default class Particles {
    constructor(number, speed, ctx) {
        this.particles = [];

        for (let i = 0; i < number; i++) {
            const particle = new Particle(
                ctx,
                random.between(0, ctx.canvas.width),
                random.between(0, ctx.canvas.height),
                random.between(-speed, speed),
                random.between(-speed, speed)
            );
            this.add(particle);
        }
    }

    add(particle) {
        this.particles.push(particle);
    }

    draw() {
        const number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].draw();
        }
    }

    update(timestamp) {
        const number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].update(timestamp);
        }
    }

    refresh() {
        const number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].randomise();
        }
    }
}

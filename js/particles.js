import Particle from './particle.js';
import random from './random.js';

export default class Particles {
    constructor(number, speed, ctx) {
        this.particles = [];

        for (let i = 0; i < number; i++) {
            let particle = new Particle(
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
        let number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].draw();
        }
    }

    update(timestamp) {
        let number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].update(timestamp);
        }
    }

    refresh() {
        let number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].randomise();
        }
    }
}
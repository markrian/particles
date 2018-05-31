import Particle from './particle.js';
import * as random from './random.js';
import { drawDisc, drawReticle } from './canvas.js';
import { near } from './collision.js';

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
        this.msToNextEmission = 0;
        this.speed = speed;
        this.particles = [];
        this.ctx = ctx;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.hovered = false;
    }

    update(dt, state) {
        this.emit(dt);

        let i = this.particles.length;
        while (i-- > 0) {
            this.particles[i].update(dt, state, i);
        }

        this.hovered = near(this.x, this.y, state.mouse.x, state.mouse.y);

        if (near(state.mouse.downStart.x, state.mouse.downStart.y, this.x, this.y)) {
            state.activeItem = this;
        }

        if (
            state.mouse.click &&
            near(this.x, this.y, state.mouse.x, state.mouse.y)
        ) {
            state.selectedItem = this;
        }

        if (state.mouse.dragging && state.activeItem === this) {
            this.x = state.mouse.x;
            this.y = state.mouse.y;
        }
    }

    draw() {
        drawDisc(this.ctx, this.x, this.y, 2.5, 'blue');

        for (const particle of this.particles) {
            particle.draw();
        }

        if (this.hovered) {
            drawReticle(this.ctx, this.x, this.y);
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

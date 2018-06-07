import Particle from './particle.js';
import * as random from './random.js';
import { drawDisc, drawReticle } from './canvas.js';

export default class Emitter {
    constructor(
        world,
        x,
        y,
        frequency,
        speed,
        startAngle,
        endAngle
    ) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.oldPos = { x, y };
        this.vx = 0;
        this.vy = 0;
        this.frequency = frequency;
        this.msToNextEmission = 0;
        this.speed = speed;
        this.particles = [];
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.hovered = false;
        this.name = 'emitter';
    }

    get msPerEmission() {
        return 1000 / this.frequency;
    }

    remove() {
        this.world.remove(this);
    }

    update(dt, state) {
        const delta_t = dt / 1000;
        this.vx = (this.x - this.oldPos.x) / delta_t;
        this.vy = (this.y - this.oldPos.y) / delta_t;
        this.oldPos.x = this.x;
        this.oldPos.y = this.y;

        this.emit(dt);

        let i = this.particles.length;
        while (i-- > 0) {
            this.particles[i].update(dt, state, i);
        }

        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;

        if (state.mouse.dragging && state.draggingItem === this) {
            this.x = state.mouse.x;
            this.y = state.mouse.y;
        }
    }

    draw() {
        if (this.hovered) {
            drawDisc(this.world.ctx, this.x, this.y, 15, 'rgba(12,230,240,.3)');
        }

        drawDisc(this.world.ctx, this.x, this.y, 2.5, 'blue');

        for (const particle of this.particles) {
            particle.draw();
        }

        if (this.selected) {
            drawReticle(this.world.ctx, this.x, this.y);
        }
    }

    emit(dt) {
        this.msToNextEmission = Math.min(this.msPerEmission, this.msToNextEmission);
        if (this.msPerEmission < dt) {
            let elapsed = 0;
            while (elapsed < dt) {
                this._emitOne();
                elapsed += this.msPerEmission;
            }
        } else if (this.msToNextEmission <= 0) {
            this._emitOne();
            this.msToNextEmission = this.msPerEmission;
        } else {
            this.msToNextEmission -= dt;
        }
    }

    _emitOne() {
        const angle = random.betweenFloat(this.startAngle, this.endAngle);

        const vx = this.speed * Math.cos(angle) + this.vx;
        const vy = this.speed * Math.sin(angle) + this.vy;

        const particle = new Particle(
            this.world.ctx,
            this.particles,
            this.x,
            this.y,
            vx,
            vy,
        );

        this.particles.push(particle);
    }
}

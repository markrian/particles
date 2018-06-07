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
        angle,
        spread
    ) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.oldPos = { x, y };
        this.vx = 0;
        this.vy = 0;
        this.frequency = frequency;
        this.secondsToNextEmission = 0;
        this.speed = speed;
        this.particles = [];
        this.angle = angle;
        this.spread = spread;
        this.hovered = false;
        this.name = 'emitter';
    }

    get secondsPerEmission() {
        return 1 / this.frequency;
    }

    remove() {
        this.world.remove(this);
    }

    update(dt, state) {
        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;

        if (state.keys.pressed.d && this.selected) {
            this.remove();
            return;
        }

        this.vx = (this.x - this.oldPos.x) / dt;
        this.vy = (this.y - this.oldPos.y) / dt;
        this.oldPos.x = this.x;
        this.oldPos.y = this.y;

        this.emit(dt);

        let i = this.particles.length;
        while (i-- > 0) {
            this.particles[i].update(dt, state, i);
        }

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
        this.secondsToNextEmission = Math.min(this.secondsPerEmission, this.secondsToNextEmission);
        if (this.secondsPerEmission < dt) {
            let elapsed = 0;
            while (elapsed < dt) {
                this._emitOne();
                elapsed += this.secondsPerEmission;
            }
        } else if (this.secondsToNextEmission <= 0) {
            this._emitOne();
            this.secondsToNextEmission = this.secondsPerEmission;
        } else {
            this.secondsToNextEmission -= dt;
        }
    }

    _emitOne() {
        const angle = random.betweenFloat(
            this.angle - this.spread / 2,
            this.angle + this.spread / 2,
        );

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

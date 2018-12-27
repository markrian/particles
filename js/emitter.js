import Particle from './particle.js';
import { poolManager } from './pool.js';
import * as random from './random.js';
import { drawDisc, drawReticle } from './canvas.js';
import Moveable from './moveable.js';

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
        this.particles = poolManager.createPool(Particle);
        this.angle = angle;
        this.spread = spread;
        this.hovered = false;
        this.name = 'emitter';
    }

    get secondsPerEmission() {
        return 1 / this.frequency;
    }

    remove() {
        poolManager.destroyPool(this.particles);
        this.world.remove(this);
    }

    update(dt, state) {
        this.hovered = state.hoveredItem === this;
        this.selected = state.selectedItem === this;

        Moveable.update(this, state);

        this.vx = (this.x - this.oldPos.x) / dt;
        this.vy = (this.y - this.oldPos.y) / dt;
        this.oldPos.x = this.x;
        this.oldPos.y = this.y;

        this.emit(dt);

        for (const particle of this.particles) {
            particle.update(dt, state);
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

        this.particles.grow(
            this.world.ctx,
            this.x,
            this.y,
            vx,
            vy,
        );
    }
}

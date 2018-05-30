export default {
    _forces: [],
    add(forces) {
        this._forces.push(...forces);
    },
    draw() {
        for (const force of this._forces) {
            force.draw();
        }
    },
    resolve(particle, dt) {
        for (const force of this._forces) {
            force.resolve(particle, dt);
        }
    },
};

export class ConstantForce {
    constructor(fx, fy) {
        this.fx = fx;
        this.fy = fy;
    }

    resolve(particle, /* dt */) {
        particle.vx += this.fx;
        particle.vy += this.fy;
    }

    draw() {}
}

export class RadialForce {
    constructor(ctx, x, y, strength) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.direction = strength >= 0 ? 1 : -1;
        this.strength = Math.abs(strength);

        this._preDraw();
    }

    resolve(particle, /* dt */) {
        const direction = [
            particle.x - this.x,
            particle.y - this.y,
        ];
        let distanceSquared = direction[0] * direction[0] +
            direction[1] * direction[1];

        if (this.direction < 0) {
            distanceSquared = Math.sqrt(distanceSquared);
        }

        const fx = this.strength * this.direction * direction[0] / distanceSquared;
        const fy = this.strength * this.direction * direction[1] / distanceSquared;
        particle.vx += fx;
        particle.vy += fy;
    }

    draw() {
        this.ctx.drawImage(this._canvas, this.x - this.strength, this.y - this.strength);
    }

    _preDraw() {
        const c = this._canvas = document.createElement('canvas');
        c.width = c.height = this.strength * 2;
        const ctx = c.getContext('2d');
        const radialGradient = ctx.createRadialGradient(
            this.strength,
            this.strength,
            0,
            this.strength,
            this.strength,
            this.strength
        );
        const color = this.direction === 0 ? '0,0,127' : '127,0,0';
        radialGradient.addColorStop(0, 'rgba(' + color + ',1)');
        radialGradient.addColorStop(1, 'rgba(' + color + ',0)');
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, this.strength * 2, this.strength * 2);
    }
}

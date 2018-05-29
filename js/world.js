import List from './list.js';
import Emitter from './emitter.js';

export default class World {
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.elapsed = 0;
        this.forces = new List();
        this.emitters = new List();

        this.emitters.push(new Emitter(
            ctx,
            state.width / 2,
            state.height / 2,
            60, // Frequency
            2000, // Particle pool size
            100, // Particle speed
            1,
            1 + Math.PI,
        ));
    }

    update(dt) {
        if (this.state.paused) {
            return;
        }

        this.elapsed += dt;

        this.forces.invoke('update', dt);
        this.emitters.invoke('update', this.elapsed);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.forces.invoke('draw');
        this.emitters.invoke('draw');
    }
}

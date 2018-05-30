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
            1, // Frequency
            2000, // Particle pool size
            100, // Particle speed
            0,
            2 * Math.PI
        ));
    }

    update(dt) {
        this.elapsed += dt;

        this.forces.call('update', dt, this.state);
        this.emitters.call('update', dt, this.state);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.forces.call('draw');
        this.emitters.call('draw');
    }
}

import List from './list.js';
import Emitter from './emitter.js';
import forces, { RadialForce, ConstantForce } from './forces.js';

export default class World {
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.forces = forces;
        this.emitters = new List();

        this.emitters.push(new Emitter(
            ctx,
            state.width / 2,
            state.height / 2 - 100,
            1, // Frequency
            200, // Particle speed
            0,
            0,
        ));

        this.forces.push(
            new RadialForce(
                this.ctx,
                state.width / 2,
                state.height / 2,
                -160,
            ),
            // new ConstantForce(0, .5),
        );
    }

    update(dt) {
        this.forces.call('update', dt, this.state);
        this.emitters.call('update', dt, this.state);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.forces.call('draw');
        this.emitters.call('draw');
    }
}

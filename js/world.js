import List from './list.js';
import Emitter from './emitter.js';
import forces, { RadialForce, ConstantForce } from './forces.js';
import { near } from './collision.js';

export default class World {
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.forces = forces;
        this.emitters = new List();

        this.emitters.push(new Emitter(
            ctx,
            state.width / 2,
            state.height / 2 - 150,
            10, // Frequency
            200, // Particle speed
            0,
            0,
        ),
        new Emitter(
            ctx,
            state.width / 2 - 100,
            state.height / 2 + 150,
            200, // Frequency
            300, // Particle speed
            3,
            1
        ));

        this.forces.push(
            new RadialForce(
                this.ctx,
                state.width / 2,
                state.height / 2,
                160,
            ),
            new ConstantForce(0, 5),
        );
    }

    update(dt) {
        this.setHoveredItem();
        this.setDraggingItem();
        this.setSelectedItem();
        this.forces.call('update', dt, this.state);
        this.emitters.call('update', dt, this.state);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.forces.call('draw');
        this.emitters.call('draw');
    }

    setHoveredItem() {
        for (const list of [this.emitters, this.forces]) {
            for (const item of list) {
                if (near(item, this.state.mouse)) {
                    this.state.hoveredItem = item;
                    return;
                }
            }
        }

        this.state.hoveredItem = null;
    }

    setDraggingItem() {
        if (this.state.mouse.dragging) {
            return;
        }

        for (const list of [this.emitters, this.forces]) {
            for (const item of list) {
                if (near(item, this.state.mouse.downStart)) {
                    this.state.draggingItem = item;
                    return;
                }
            }
        }

        this.state.draggingItem = null;
    }

    setSelectedItem() {
        if (!this.state.mouse.click) {
            return;
        }

        for (const list of [this.emitters, this.forces]) {
            for (const item of list) {
                if (near(item, this.state.mouse.downStart)) {
                    this.state.selectedItem = item;
                    return;
                }
            }
        }

        this.state.selectedItem = null;
    }
}

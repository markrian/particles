import List from './list.js';
import Emitter from './emitter.js';
import forces, { RadialForce, ConstantForce } from './forces.js';
import * as random from './random.js';
import { near } from './collision.js';
import Panels from './panels.js';

export default class World {
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.forces = forces;
        this.emitters = new List();
        this.panels = new Panels();

        this.emitters.push(new Emitter(
            this,
            state.width / 2,
            state.height / 2,
            10, // Frequency
            200, // Particle speed
            -Math.PI / 4,
            Math.PI / 4,
        ));
    }

    update(dt) {
        this.addItems();
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

    addItems() {
        if (this.state.keys.pressed.e) {
            this.emitters.push(new Emitter(
                this,
                random.between(10, this.state.width - 10),
                random.between(10, this.state.height - 10),
                10, // Frequency
                200, // Particle speed
                0,
                Math.PI * 2,
            ));
        }

        if (this.state.keys.pressed.r) {
            this.forces.push(new RadialForce(
                this,
                random.between(10, this.state.width - 10),
                random.between(10, this.state.height - 10),
                160,
            ));
        }

        if (this.state.keys.pressed.c) {
            this.forces.push(new ConstantForce(
                this,
                Math.PI / 4,
                1000,
                random.between(10, this.state.width - 10),
                random.between(10, this.state.height - 10),
            ));
        }
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
                    this.panels.open(item);
                    return;
                }
            }
        }

        this.state.selectedItem = null;
        this.panels.close();
    }

    remove(item) {
        this.emitters.remove(item);
        this.forces.remove(item);
    }
}

import List from './list.js';
import Emitter from './emitter.js';
import forces, { RadialForce, ConstantForce } from './forces.js';
import * as random from './random.js';
import { near } from './geometry.js';
import Panels from './panels.js';
import { adjustTimeSpeed } from './game-loop.js';

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
            0, // Angle
            Math.PI / 2, // Spread
        ));
    }

    update(dt) {
        this.adjustTime();
        this.addItems();
        this.showHelp();
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

    adjustTime() {
        if (this.state.keys.pressed['-']) {
            adjustTimeSpeed(-1);
        }

        if (this.state.keys.pressed['+'] || this.state.keys.pressed['=']) {
            adjustTimeSpeed(1);
        }
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

    showHelp() {
        if (this.state.keys.pressed['?'] || this.state.keys.pressed['h']) {
            document.querySelector('.help').classList.toggle('help-closed');
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
        if (this.state.selectedItem === item) {
            this.state.selectedItem = null;
            this.panels.close();
        }

        this.emitters.remove(item);
        this.forces.remove(item);
    }
}

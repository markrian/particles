import log from './log.js';
import { canvas, ctx, clear } from './canvas.js';
import forces from './forces.js';
import RadialForce from './radialforce.js';
import ConstantForce from './constantforce.js';
import Emitter from './emitter.js';
import state from './state.js';
import World from './world.js';
import bindEvents from './bind-events.js';
import keyboardEvents from './keyboard-events.js';
import mouseEvents from './mouse-events.js';
import resizeEvents from './resize-events.js';

log('Ready');

function init() {
    bindEvents(window, keyboardEvents);
    bindEvents(window, mouseEvents);
    bindEvents(window, resizeEvents);

    resizeEvents.resize();

    const world = new World(state, ctx);
    const dt = 1000 / 60;

    function loop() {
        requestAnimationFrame(loop);
        world.update(dt);
        world.draw();
    }

    loop();
}

init();

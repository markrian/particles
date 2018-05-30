import log from './log.js';
import { ctx } from './canvas.js';
import state from './state.js';
import World from './world.js';
import bindEvents from './bind-events.js';
import keyboardEvents from './keyboard-events.js';
import mouseEvents from './mouse-events.js';
import windowEvents from './window-events.js';

log('Ready');

function init() {
    bindEvents(window, keyboardEvents);
    bindEvents(window, mouseEvents);
    bindEvents(window, windowEvents);

    windowEvents.resize();

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

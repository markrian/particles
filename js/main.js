import bindEvents from './bind-events.js';
import keyboardEvents from './keyboard-events.js';
import mouseEvents from './mouse-events.js';
import windowEvents from './window-events.js';
import World from './world.js';
import { ctx } from './canvas.js';
import state from './state.js';
import loop from './game-loop.js';

function init() {
    bindEvents(window, keyboardEvents);
    bindEvents(window, mouseEvents);
    bindEvents(window, windowEvents);

    windowEvents.resize();

    const world = new World(state, ctx);
    window.world = world;
    const dt = 1000 / 60;
    window.loop = loop;

    loop.start(
        () => world.update(dt),
        () => world.draw(),
    );
}

init();

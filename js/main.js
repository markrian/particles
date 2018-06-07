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

    loop.start(
        dt => {
            state.keys.pressed = {};
            for (const key in state.keys.live) {
                if (state.keys.live[key]) {
                    state.keys.pressed[key] = !state.keys.old[key];
                }
            }

            state.keys.old = { ...state.keys.live };

            world.update(dt);
        },
        () => world.draw(),
    );
}

init();

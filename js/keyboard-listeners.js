import state from './state.js';
import bindEvents from './bind-events.js';

const listeners = {
    keydown(event) {
        state.keys[event.key] = true;
    },

    keyup(event) {
        state.keys[event.key] = false;
    },
}

bindEvents(window, listeners);

import state from './state.js';
import loop from './game-loop.js';

export default {
    keydown(event) {
        if (event.key === 'p' && !state.keys.p) {
            state.paused = !state.paused;
            state.paused ? loop.pause() : loop.resume();
        }

        state.keys[event.key] = true;
    },

    keyup(event) {
        state.keys[event.key] = false;
    },
};
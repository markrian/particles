import state from './state.js';
import loop from './game-loop.js';

export default {
    keydown(event) {
        if (event.key === 'p' && !state.keys.p) {
            state.paused = !state.paused;
            if (state.paused) {
                loop.pause();
            } else {
                loop.resume();
            }
        }

        state.keys[event.key] = true;
    },

    keyup(event) {
        state.keys[event.key] = false;
    },
};

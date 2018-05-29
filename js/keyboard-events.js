import state from './state.js';

export default {
    keydown(event) {
        if (event.key === 'p' && !state.keys.p) {
            state.paused = !state.paused;
        }

        state.keys[event.key] = true;
    },

    keyup(event) {
        state.keys[event.key] = false;
    },
};

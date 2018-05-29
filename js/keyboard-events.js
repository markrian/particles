import state from './state.js';

export default {
    keydown(event) {
        state.keys[event.key] = true;
    },

    keyup(event) {
        state.keys[event.key] = false;
    },
};

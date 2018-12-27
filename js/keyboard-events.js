import state from './state.js';
import loop from './game-loop.js';

export default {
    keydown(event) {
        if (event.key === 'p' && !state.keys.live.p) {
            state.paused = !state.paused;
            if (state.paused) {
                loop.pause();
            } else {
                loop.resume();
            }
        }

        state.keys.live[event.key] = true;
    },

    keyup(event) {
        state.keys.live[event.key] = false;
    },
};

export function update(dt, state) {
    state.keys.pressed = {};
    for (const key in state.keys.live) {
        if (state.keys.live[key]) {
            state.keys.pressed[key] = !state.keys.old[key];
        }
    }

    state.keys.old = Object.assign({}, state.keys.live);
}

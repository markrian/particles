import state from './state.js';

export default {
    mousedown(event) {
        if (event.button === 0) {
            state.mouse.down = true;
        }
    },

    mousemove(event) {
        // TODO: will want to transform to canvas coords, probably?
        state.mouse.x = event.pageX;
        state.mouse.y = event.pageX;
    },

    mouseup(event) {
        if (event.button === 0) {
            state.mouse.down = false;
        }
    },
};

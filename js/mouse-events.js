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
        state.mouse.y = event.pageY;

        if (state.mouse.down) {
            state.mouse.dragging = true;
        }
    },

    mouseup(event) {
        if (event.button === 0) {
            state.mouse.down = false;
            state.mouse.dragging = false;
        }
    },
};

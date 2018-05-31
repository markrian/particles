import state from './state.js';
import { near } from './collision.js';

const DRAG_THRESHOLD = 20;

export default {
    mousedown(event) {
        if (event.button === 0) {
            state.mouse.down = true;
            state.mouse.downStart.x = state.mouse.x;
            state.mouse.downStart.y = state.mouse.y;
        }
    },

    mousemove(event) {
        // TODO: will want to transform to canvas coords, probably?
        state.mouse.x = event.pageX;
        state.mouse.y = event.pageY;

        if (state.mouse.down) {
            if (
                Math.abs(state.mouse.downStart.x - state.mouse.x) > DRAG_THRESHOLD ||
                Math.abs(state.mouse.downStart.y - state.mouse.y) > DRAG_THRESHOLD
            ) {
                state.mouse.dragging = true;
            }
        } else {
            state.mouse.downStart.x = null;
            state.mouse.downStart.y = null;
            state.mouse.downEnd.x = null;
            state.mouse.downEnd.y = null;
            state.mouse.click = false;
        }
    },

    mouseup(event) {
        if (event.button === 0) {
            state.mouse.down = false;
            state.mouse.dragging = false;
            state.mouse.downEnd.x = state.mouse.x;
            state.mouse.downEnd.y = state.mouse.y;
            state.activeItem = null;

            if (
                near(
                    state.mouse.downStart.x, state.mouse.downStart.y,
                    state.mouse.downEnd.x, state.mouse.downEnd.y
                )
            ) {
                state.mouse.click = true;
            }
        }
    },
};

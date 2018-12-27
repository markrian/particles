import state from './state.js';
import { near } from './geometry.js';

const DRAG_THRESHOLD = 5;

export default {
    mousedown(event) {
        if (event.button === 0) {
            state.mouse.down = true;
            state.mouse.downStart.x = state.mouse.x;
            state.mouse.downStart.y = state.mouse.y;
        }
    },

    mousemove(event) {
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

            if (near(state.mouse.downStart, state.mouse.downEnd)) {
                state.mouse.click = true;
            }
        }
    },
};

export function update() {
    if (state.mouse.oldClick && state.mouse.click) {
        state.mouse.click = false;
    }

    state.mouse.oldClick = state.mouse.click;
}

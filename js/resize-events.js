import state from './state.js';
import { canvas } from './canvas.js';

export default {
    resize() {
        state.width = window.innerWidth;
        state.height = window.innerHeight;

        canvas.width = state.width;
        canvas.height = state.height;
    },
};

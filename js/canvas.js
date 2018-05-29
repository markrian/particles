import state from './state.js';

export const canvas = document.getElementById('view');
export const ctx = canvas.getContext('2d');

export function clear() {
    ctx.clearRect(0, 0, state.width, state.height);
}

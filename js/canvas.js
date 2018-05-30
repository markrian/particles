import state from './state.js';

const TAU = Math.PI * 2;

export const canvas = document.getElementById('view');
export const ctx = canvas.getContext('2d');

export function clear() {
    ctx.clearRect(0, 0, state.width, state.height);
}

export function fillCircle(context, x, y, radius, fillStyle) {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.arc(x, y, radius, 0, TAU);
    context.fill();
}

const TAU = Math.PI * 2;

export const canvas = document.getElementById('view');
export const ctx = canvas.getContext('2d');

export function drawDisc(context, x, y, radius, fillStyle) {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.arc(x, y, radius, 0, TAU);
    context.fill();
}

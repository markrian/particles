const TAU = Math.PI * 2;

export const canvas = document.getElementById('view');
export const ctx = canvas.getContext('2d');

export function drawDisc(context, x, y, radius, fillStyle) {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.arc(x, y, radius, 0, TAU);
    context.fill();
}

export function drawReticle(context, x, y) {
    context.beginPath();
    const size = 16;
    const thickness = 2;
    const style = 'black';

    context.save();
    context.translate(x, y);

    for (let i = 0; i < 4; i++) {
        context.rect(-size, -size, thickness, thickness);
        context.rect(-size + thickness, -size, thickness, thickness);
        context.rect(-size, -size + thickness, thickness, thickness);

        context.rotate(Math.PI/2);
    }

    context.fillStyle = style;
    context.fill();

    context.restore();
}

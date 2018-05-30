const TAU = Math.PI * 2;

export const canvas = document.getElementById('view');
export const ctx = canvas.getContext('2d');

export function drawDisc(context, x, y, radius, fillStyle) {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.arc(x, y, radius, 0, TAU);
    context.fill();
}

export function drawReticule(context, x, y) {
    context.beginPath();
    const size = 20;
    const thickness = 4;
    const style = 'black';

    context.rect(x - size/2 - thickness/2, y - size/2 - thickness/2, thickness, thickness);
    context.rect(x - size/2 - thickness/2, y - size/2 + thickness/2, thickness, thickness);
    context.rect(x - size/2 + thickness/2, y - size/2 - thickness/2, thickness, thickness);

    context.rect(x + size/2 + thickness/2, y - size/2 - thickness/2, thickness, thickness);
    context.rect(x + size/2 + thickness/2, y - size/2 + thickness/2, thickness, thickness);
    context.rect(x + size/2 - thickness/2, y - size/2 - thickness/2, thickness, thickness);

    context.rect(x - size/2 - thickness/2, y + size/2 + thickness/2, thickness, thickness);
    context.rect(x - size/2 - thickness/2, y + size/2 - thickness/2, thickness, thickness);
    context.rect(x - size/2 + thickness/2, y + size/2 + thickness/2, thickness, thickness);

    context.rect(x + size/2 + thickness/2, y + size/2 + thickness/2, thickness, thickness);
    context.rect(x + size/2 + thickness/2, y + size/2 - thickness/2, thickness, thickness);
    context.rect(x + size/2 - thickness/2, y + size/2 + thickness/2, thickness, thickness);

    context.fillStyle = style;
    context.fill();
}

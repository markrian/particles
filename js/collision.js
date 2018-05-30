export function pointInRect(px, py, rx, ry, width, height) {
    return px >= rx &&
        py >= ry &&
        px <= rx + width &&
        py <= ry + height;
}

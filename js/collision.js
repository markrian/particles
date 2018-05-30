export function pointInRect(px, py, rx, ry, width, height) {
    return px >= rx &&
        py >= ry &&
        px <= rx + width &&
        py <= ry + height;
}

export function near(x, y, ox, oy, distance = 20) {
    return Math.abs(x - ox) < distance &&
        Math.abs(y - oy) < distance;
}

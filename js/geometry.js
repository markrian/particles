export function pointInRect(p, rx, ry, width, height) {
    return p.x >= rx &&
        p.y >= ry &&
        p.x <= rx + width &&
        p.y <= ry + height;
}

export function near(a, b, distance = 20) {
    return Math.abs(a.x - b.x) < distance &&
        Math.abs(a.y - b.y) < distance;
}

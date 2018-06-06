export function between(a, b) {
    if (a > b) {
        [a, b] = [b, a];
    }
    return Math.floor(
        (a + Math.random() * (b - a + 1))
    );
}

export function betweenFloat(a, b) {
    if (a > b) {
        [a, b] = [b, a];
    }
    return (a + Math.random() * (b - a));
}

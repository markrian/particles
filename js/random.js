export function between(a, b) {
    return Math.floor(
        (a + Math.random() * (b - a + 1))
    );
}

export function betweenFloat(a, b) {
    return (a + Math.random() * (b - a));
}

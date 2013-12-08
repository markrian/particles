define({
    between: function between(a, b) {
        return Math.floor(
            (a + Math.random() * (b - a + 1))
        );
    }
});
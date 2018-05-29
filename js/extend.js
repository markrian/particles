define(() => {
    return function extend(target, source) {
        Object.getOwnPropertyNames(source).forEach(key => {
            target[key] = source[key];
        });
    };
});

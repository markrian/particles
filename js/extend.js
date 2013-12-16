define(function () {
    return function extend(target, source) {
        Object.getOwnPropertyNames(source).forEach(function (key) {
            target[key] = source[key];
        });
    };
});
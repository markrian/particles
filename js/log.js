define(function () {
    return function log() {
        window.console.log.apply(window.console, arguments);
    };
});
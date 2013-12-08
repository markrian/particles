define(function () {
    var callbacks = [];
    var id;

    function draw(timestamp) {
        id = window.requestAnimationFrame(draw);
        var n = callbacks.length;
        for (var i = 0; i < n; i++) {
            callbacks[i](timestamp);
        }
    }

    return {
        add: function add(callback) {
            callbacks.push(callback);
        },
        start: function start() {
            id = window.requestAnimationFrame(draw);
        },
        stop: function stop() {
            window.cancelAnimationFrame(id);
        }
    };
});
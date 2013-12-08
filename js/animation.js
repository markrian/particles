define(function () {
    var callbacks = [];
    var id;
    var isRunning = false;

    function draw(timestamp) {
        id = window.requestAnimationFrame(draw);
        var n = callbacks.length;
        for (var i = 0; i < n; i++) {
            callbacks[i](timestamp);
        }
    }

    var animation = {
        add: function add() {
            var n = arguments.length;
            for (var i = 0; i < n; i++) {
                callbacks.push(arguments[i]);
            }
        },
        start: function start() {
            id = window.requestAnimationFrame(draw);
            isRunning = true;
        },
        stop: function stop() {
            window.cancelAnimationFrame(id);
            isRunning = false;
        },
        toggle: function toggle() {
            if (isRunning) {
                animation.stop();
            } else {
                animation.start();
            }
        }
    };

    return animation;
});
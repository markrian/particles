const callbacks = [];
let id;
let isRunning = false;

function draw(timestamp) {
    id = requestAnimationFrame(draw);
    for (const callback of callbacks) {
        callback(timestamp);
    }
}

const animation = {
    add(...callbacks) {
        callbacks.push(...callbacks);
    },
    start() {
        id = requestAnimationFrame(draw);
        isRunning = true;
    },
    stop() {
        cancelAnimationFrame(id);
        isRunning = false;
    },
    toggle() {
        if (isRunning) {
            animation.stop();
        } else {
            animation.start();
        }
    },
};

export default animation;

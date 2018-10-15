// Time increment in seconds
let dt = 1 / 60;

class GameLoop {
    constructor() {
        this.frameId = 0;
        this.loop = null;
    }

    start(update, draw) {
        this.pause();

        this.loop = () => {
            this.frameId = requestAnimationFrame(this.loop);
            update(dt);
            draw();
        };

        this.loop();
    }

    pause() {
        cancelAnimationFrame(this.frameId);
    }

    resume() {
        this.loop();
    }
}

export function adjustTimeSpeed(factor) {
    if (factor === 1) {
        dt += 1 / 240;
    } else {
        dt -= 1 / 240;
    }
}

export default new GameLoop();

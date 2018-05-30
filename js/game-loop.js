const FRAME_TIME = 1000 / 60;

class GameLoop {
    constructor() {
        this.frameId = 0;
        this.loop = null;
        this.previousNow = 0;
    }

    start(update, draw) {
        this.pause();

        this.loop = () => {
            const now = performance.now();
            let dt = now - this.previousNow;
            this.previousNow = now;

            this.frameId = requestAnimationFrame(this.loop);

            while (dt >= FRAME_TIME) {
                update();
                dt -= FRAME_TIME;
            }

            draw();
        };

        this.previousNow = performance.now();
        this.loop();
    }

    pause() {
        cancelAnimationFrame(this.frameId);
    }

    resume() {
        this.previousNow = performance.now();
        this.loop();
    }
}

export default new GameLoop();

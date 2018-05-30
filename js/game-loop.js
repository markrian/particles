const FRAME_TIME = 1000 / 60;

class GameLoop {
    constructor() {
        this.frameId = 0;
        this.loop = null;
        this.lag = 0;
        this.previousNow = 0;
    }

    start(update, draw) {
        this.pause();

        this.loop = () => {
            const now = performance.now();
            const dt = now - this.previousNow;
            this.previousNow = now;
            this.lag += dt;

            this.frameId = requestAnimationFrame(this.loop);

            while (this.lag >= FRAME_TIME) {
                update();
                this.lag -= FRAME_TIME;
            }

            draw();
        };

        this.lag = 0;
        this.previousNow = performance.now();
        this.loop();
    }

    pause() {
        cancelAnimationFrame(this.frameId);
    }

    resume() {
        this.lag = 0;
        this.previousNow = performance.now();
        this.loop();
    }
}

export default new GameLoop();

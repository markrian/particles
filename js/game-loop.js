const dt = 1000 / 60;

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

export default new GameLoop();

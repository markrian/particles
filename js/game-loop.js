class GameLoop {
    constructor() {
        this.frameId = 0;
        this.loop = null;
    }

    start(worker) {
        this.pause();

        this.loop = () => {
            this.frameId = requestAnimationFrame(this.loop);
            worker();
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

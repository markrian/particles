class Animation {
    constructor() {
        this.draw = this.draw.bind(this);
    }

    addUpdate(...fns) {
        this.updateFns.push(...fns);
    }

    addDraw(...fns) {
        this.drawFns.push(...fns);
    }

    draw() {
        this.id = requestAnimationFrame(this.draw);
        for (const callback of updateFns) {
            callback(timestamp);
        }
    }

    start() {
        this.id = requestAnimationFrame(this.draw);
        this.running = true;
    }

    stop() {
        cancelAnimationFrame(this.id);
        this.running = false;
    }

    toggle() {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }
}

export default new Animation();

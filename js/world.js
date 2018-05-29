export default class World {
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.elapsed = 0;
    }

    update(dt) {
        if (!this.state.paused) {
            this.elapsed += dt;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.state.width, this.state.height);
        const midX = this.state.width / 2;
        const midY = this.state.height / 2;
        const text = (this.elapsed / 1000).toFixed(2) + ' seconds';
        this.ctx.fillText(text, midX, midY);
    }
}

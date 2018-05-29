export default class World {
    constructor(state) {
        this.state = state;
        this.elapsed = 0;
    }

    update(dt) {
        this.elapsed += dt;
    }
}

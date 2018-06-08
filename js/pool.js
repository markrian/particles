import * as assert from './assert.js';

export default class Pool {
    constructor(size, Constructor) {
        assert.isFunction(Constructor.init, `${Constructor.name} does not have a static initialiser`);
        this.size = size;
        this.Constructor = Constructor;
        this.pool = [];
        this.cursor = -1;
    }

    *[Symbol.iterator]() {
        yield* this.pool;
    }

    grow(...args) {
        if (this.pool.length < this.size) {
            const newItem = new this.Constructor(...args);
            this.cursor = this.pool.push(newItem) - 1;
            return newItem;
        }

        this.cursor = (this.cursor + 1) % this.pool.length;
        const item = this.pool[this.cursor];
        this.Constructor.init(item, ...args);
        return item;
    }
}

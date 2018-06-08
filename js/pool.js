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

    setSize(size) {
        this.size = size;
        if (size < this.pool.length) {
            // Truncate the pool, reset cursor if necessary
            this.pool.length = size;
            if (this.cursor >= size - 1) {
                this.cursor = 0;
            }
        }
    }
}

export class PoolManager {
    constructor(size) {
        this.size = size;
        this.pools = [];
    }

    createPool(Constructor) {
        const size = Math.floor(this.size / (this.pools.length + 1));
        const pool = new Pool(size, Constructor);
        this.pools.push(pool);
        this.resizePools();
        return pool;
    }

    destroyPool(pool) {
        const poolIndex = this.pools.indexOf(pool);
        this.pools.splice(poolIndex, 1);
        this.resizePools();
    }

    resizePools() {
        if (this.pools.length === 0) {
            return;
        }

        const sizePerPool = Math.floor(this.size / this.pools.length);
        for (const pool of this.pools) {
            pool.setSize(sizePerPool);
        }
    }
}

const N_DIVISIBLE_BY_INTS_1_TO_10 = 2520;
export const poolManager = new PoolManager(N_DIVISIBLE_BY_INTS_1_TO_10);

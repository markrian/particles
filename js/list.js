export default class List extends Array {
    call(method, ...args) {
        for (const item of this) {
            item[method](...args);
        }
    }

    remove(item) {
        const index = this.indexOf(item);
        if (index > -1) {
            this.splice(index, 1);
        }
    }
}

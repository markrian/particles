export default class List extends Array {
    invoke(method, ...args) {
        for (const item of this) {
            item[method](...args);
        }
    }
}

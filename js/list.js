export default class List extends Array {
    call(method, ...args) {
        for (const item of this) {
            item[method](...args);
        }
    }
}

export function isFunction(value, message) {
    assert(typeof value === 'function', message);
}

export function assert(value, message) {
    if (value !== true) {
        throw new Error(message);
    }
}

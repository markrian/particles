export default function bindEvents(eventEmitter, listeners) {
    for (const key of Object.getOwnPropertyNames(listeners)) {
        eventEmitter.addEventListener(key, listeners[key]);
    }
}

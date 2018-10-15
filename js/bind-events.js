export default function bindEvents(eventEmitter, listeners) {
    for (const key of Object.keys(listeners)) {
        eventEmitter.addEventListener(key, listeners[key]);
    }
}

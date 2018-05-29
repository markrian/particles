export default function bindEvents(eventEmitter, listeners) {
    for (const key in listeners) {
        eventEmitter.addEventListener(key, listeners[key]);
    }
}

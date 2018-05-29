export default return function log() {
    window.console.log.apply(window.console, arguments);
}
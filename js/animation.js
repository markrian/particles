export function onTransitionEnd(el, fn) {
    if (!('ontransitionend' in el)) {
        fn();
        return;
    }
    const listener = function (event) {
        fn(event);
        el.removeEventListener(listener);
    };

    el.addEventListener('transitionend', listener);
}

export const rAF = requestAnimationFrame;

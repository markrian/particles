const transitionend = 'transitionend';

export function onTransitionEnd(el, fn) {
    if (!('on' + transitionend in el)) {
        fn();
        return;
    }
    const listener = function (event) {
        fn(event);
        el.removeEventListener(transitionend, listener);
    };

    el.addEventListener(transitionend, listener);
}

export const rAF = requestAnimationFrame;

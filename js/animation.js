const transitionend = 'transitionend';

export async function onTransitionEnd(el) {
    if (!('on' + transitionend in el)) {
        return;
    }

    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            console.warn('timeout waiting for transitionend', el);
            resolve();
        }, 1000);

        const listener = function (event) {
            el.removeEventListener(transitionend, listener);
            resolve();
            clearTimeout(timeout);
        };

        el.addEventListener(transitionend, listener);
    });
}

// Ensure CSS transitions triggered by JS toggling classes always work
export function doubleRAF(fn) {
    return requestAnimationFrame(() => requestAnimationFrame(fn));
}

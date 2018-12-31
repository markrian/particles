import bindEvents from './bind-events.js';
import { onTransitionEnd, doubleRAF } from './animation.js';

const noop = () => {};

function sensiblePrecision(number) {
    number = Number(number);
    if (Math.floor(number) === number) {
        return String(number);
    }

    return number.toFixed(1);
}

function radiansToDegrees(radians) {
    radians = Number(radians);
    const degrees = Math.round(radians / Math.PI * 180);
    return `${sensiblePrecision(degrees)}°`;
}

const OPEN = 0;
const OPENING = 1;
const CLOSED = 2;
const CLOSING = 3;

class Panel {
    constructor() {
        this.el = document.getElementById(`${this.name}-panel`);
        this.item = null;
        this.initSettings();
        this.bindControls();
        this.stopEventPropagation();
        this.state = this.el.classList.contains('hide') ? CLOSED : OPEN;
    }

    initSettings() {
        this.settings = this.constructor.settings.map(setting => Object.assign({},
            setting,
            { asReadableValue: setting.asReadableValue || sensiblePrecision },
        ));
    }

    get name() {
        throw new Error('must be overridden');
    }

    bindControls() {
        for (const setting of this.settings) {
            setting.inputEl = this.el.querySelector(
                `#${this.name}-${setting.name}`
            );

            setting.valueEl = this.el.querySelector(
                `#${this.name}-${setting.name}-value`
            );

            setting.inputEl.addEventListener('input', event => {
                if (this.item === null) {
                    return;
                }

                this.item[setting.attr] = Number(event.target.value);
                setting.valueEl.textContent = setting.asReadableValue(event.target.value);
            });
        }

        this.el.querySelector('button.delete').addEventListener('click', () => this.deleteItem());
        this.el.querySelector('button.close').addEventListener('click', () => this.close());
    }

    async open(item) {
        if (this.item === item) {
            return;
        }

        this.item = item;
        for (const setting of this.settings) {
            setting.inputEl.value = item[setting.attr];
            setting.valueEl.textContent = setting.asReadableValue(item[setting.attr]);
        }

        switch (this.state) {
            case CLOSED:
                this.state = OPENING;
                this.el.classList.remove('hide');
                doubleRAF(() => this.el.classList.remove('panel-closed'));
                await onTransitionEnd(this.el);
                if (this.state === OPENING) {
                    this.state = OPEN;
                }
                break;
            case CLOSING:
                await onTransitionEnd(this.el);
                if (this.state === CLOSED) {
                    return this.open(item);
                }
                break;
            default:
                break;
        }
    }

    async close() {
        switch (this.state) {
            case OPEN:
            case OPENING:
                this.state = CLOSING;
                this.el.classList.add('panel-closed');
                await onTransitionEnd(this.el);
                if (this.state === CLOSING) {
                    this.el.classList.add('hide');
                    this.state = CLOSED;
                    this.item = null;
                }
                break;
            default:
                break;
        }
    }

    stopEventPropagation() {
        const stopPropagation = event => event.stopPropagation();

        bindEvents(this.el, {
            mousedown: stopPropagation,
            mouseup: stopPropagation,
            mousemove: stopPropagation,
        });
    }

    deleteItem() {
        if (this.item === null) {
            return;
        }

        this.item.remove();
        this.close();
    }
}

class ConstantForcePanel extends Panel {
    get name() {
        return 'constant-force';
    }
}
ConstantForcePanel.settings = [{
    name: 'angle',
    attr: 'angle',
    asReadableValue: radiansToDegrees,
}, {
    name: 'strength',
    attr: 'strength',
}];

class RadialForcePanel extends Panel {
    get name() {
        return 'radial-force';
    }
}
RadialForcePanel.settings = [{
    name: 'mass',
    attr: 'mass',
}];

class EmitterPanel extends Panel {
    get name() {
        return 'emitter';
    }
}
EmitterPanel.settings = [{
    name: 'speed',
    attr: 'speed',
}, {
    name: 'frequency',
    attr: 'frequency',
}, {
    name: 'angle',
    attr: 'angle',
    asReadableValue: radiansToDegrees,
}, {
    name: 'spread',
    attr: 'spread',
    asReadableValue: radiansToDegrees,
}];

export default class Panels {
    constructor() {
        this.panels = {
            'constant-force': new ConstantForcePanel(),
            'radial-force': new RadialForcePanel(),
            emitter: new EmitterPanel(),
        };
        this.openPanel = null;
        const panels = this;

        this.state = new FSM({
            open: {
                async closing() {
                    const panel = panels.openPanel;
                    panels.openPanel = null;
                    await panel.close();
                    this.transitionTo('closed');
                },
            },
            opening: {
                open: noop,
                async closing() {
                    const panel = panels.openPanel;
                    panels.openPanel = null;
                    await panel.close()
                    this.transitionTo('closed');
                },
            },
            closed: {
                initial: true,
                async opening(item) {
                    panels.openPanel = panels.panels[item.name];
                    await panels.openPanel.open(item);
                    this.transitionTo('open');
                },
            },
            closing: {
                closed: noop,
                async opening(item) {
                    panels.openPanel = panels.panels[item.name];
                    await panels.openPanel.open(item);
                    this.transitionTo('open');
                },
            },
        });
    }

    open(item) {
        this.close();
        this.state.transitionTo('opening', item);
    }

    close() {
        this.state.transitionTo('closing');
    }
}

class FSM {
    constructor(states) {
        this.validKeys = 'onEnter onExit initial'.split(' ');
        this.validateStates(states);
        this.states = states;
        for (const state in states) {
            if (states[state].initial) {
                this.state = state;
            }
            if (!('onEnter' in states[state])) states[state].onEnter = noop;
            if (!('onExit' in states[state])) states[state].onExit = noop;
        }

        if (this.state === undefined) {
            throw new Error('no initial state set');
        }
    }

    validateStates(states) {
        const allStates = Object.keys(states);
        const possibleSubKeys = [...allStates, ...this.validKeys];
        for (const state of allStates) {
            const subkeys = Object.keys(states[state]);
            const invalid = subkeys.filter(subkey => !possibleSubKeys.includes(subkey));
            if (invalid.length > 0) {
                throw new Error(`Invalid subkeys ${invalid} in ${state}`)
            }
        }
    }

    transitionTo(destState, ...args) {
        const transitionableStates = this.transitionableStates(this.state);
        if (!transitionableStates.includes(destState)) {
            // Is throwing an error better? Is it the call's responsibility to
            // know whether this is possible? Probably not. Hence just return.
            return;
        }
        console.log(`${this.state} -> ${destState}`);
        const method = this.states[this.state][destState];
        this.states[this.state].onExit();
        this.state = destState;
        this.states[destState].onEnter(...args);
        method.call(this, ...args);
    }

    transitionableStates(state) {
        return Object.keys(this.states[state])
            .filter(key => key !== 'onEnter' && key !== 'onExit');
    }
}

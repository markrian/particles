import bindEvents from './bind-events.js';
import { onTransitionEnd, doubleRAF } from './animation.js';

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
                return;
            case CLOSING:
                await onTransitionEnd(this.el);
                if (this.state === CLOSED) {
                    return this.open(item);
                }
                return;
            default:
                return;
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
                return;
            default:
                return;
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
    }

    async open(item) {
        await this.close();
        this.openPanel = this.panels[item.name];
        return this.openPanel.open(item);
    }

    async close() {
        if (this.openPanel !== null) {
            await this.openPanel.close();
            this.openPanel = null;
        }
    }
}

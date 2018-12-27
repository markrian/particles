import bindEvents from './bind-events.js';
import { onTransitionEnd, rAF } from './animation.js';

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

class Panel {
    constructor() {
        this.el = document.getElementById(`${this.name}-panel`);
        this.item = null;
        this.initSettings();
        this.bindControls();
        this.stopEventPropagation();
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

    open(item) {
        this.el.classList.remove('hide');
        rAF(() => this.el.classList.remove('panel-closed'));
        this.item = item;
        for (const setting of this.settings) {
            setting.inputEl.value = item[setting.attr];
            setting.valueEl.textContent = setting.asReadableValue(item[setting.attr]);
        }
    }

    close() {
        this.el.classList.add('panel-closed');
        onTransitionEnd(this.el, () => this.el.classList.add('hide'));
        this.item = null;
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
    }

    open(item) {
        this.close();
        this.panels[item.name].open(item);
    }

    close() {
        for (const name of Object.keys(this.panels)) {
            this.panels[name].close();
        }
    }
}

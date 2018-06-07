import bindEvents from './bind-events.js';

function sensiblePrecision(number) {
    if (Math.floor(number) === number) {
        return String(number);
    }

    return number.toFixed(1);
}

export default class Panels {
    constructor() {
        this.panels = {
            'constant-force': new ConstantForcePanel(),
            'radial-force': new RadialForcePanel(),
            'emitter': new EmitterPanel(),
        }
    }

    open(item) {
        this.close();
        this.panels[item.name].open(item);
    }

    close() {
        for (const name in this.panels) {
            this.panels[name].close();
        }
    }
}

class Panel {
    constructor() {
        this.el = document.getElementById(`${this.name}-panel`);
        this.item = null;
        this.settings = this.constructor.settings.map(setting => ({ ...setting }));
        this.bindControls();
        this.stopEventPropagation();
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

                this.item[setting.attr] = setting.valueEl.textContent = Number(event.target.value);
            });
        }

        this.el.querySelector('button.close').addEventListener('click', () => this.close());
    }

    open(item) {
        this.el.classList.toggle('panel-closed', false);
        this.item = item;
        for (const setting of this.settings) {
            setting.inputEl.value = item[setting.attr];
            setting.valueEl.textContent = sensiblePrecision(item[setting.attr]);
        }
    }

    close() {
        this.el.classList.toggle('panel-closed', true);
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
}

class ConstantForcePanel extends Panel {
    get name() {
        return 'constant-force';
    }
}
ConstantForcePanel.settings = [{
    name: 'angle',
    attr: 'angle',
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
    name: 'start-angle',
    attr: 'startAngle',
}, {
    name: 'frequency',
    attr: 'frequency',
}, {
    name: 'end-angle',
    attr: 'endAngle',
}];

export default class Panels {
    constructor() {
        this.panels = {
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
    }

    open(item) {
        this.el.classList.toggle('panel-closed', false);
        this.item = item;
        for (const setting of this.settings) {
            setting.valueEl.textContent = setting.inputEl.value = item[setting.attr];
        }
    }

    close() {
        this.el.classList.toggle('panel-closed', true);
        this.item = null;
    }
}

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

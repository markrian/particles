
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

class RadialForcePanel {
    constructor() {
        this.el = document.getElementById('radial-force-panel');
        this.item = null;
        this.onMassChange = this.onMassChange.bind(this);

        this.bindControls();
    }

    bindControls() {
        this.el.querySelector('#radial-force-mass').addEventListener('input', this.onMassChange);
        this.el.querySelector('button.close').addEventListener('click', () => this.close());
    }

    onMassChange(event) {
        if (this.item === null) {
            return;
        }

        const mass = event.target.value;

        this.el.querySelector('#radial-force-mass-value').textContent = mass;
        this.item.mass = mass;
    }

    open(item) {
        this.el.classList.toggle('panel-closed', false);
        this.item = item;
    }

    close() {
        this.el.classList.toggle('panel-closed', true);
        this.item = null;
    }
}

class EmitterPanel {
    constructor() {
        this.el = document.getElementById('emitter-panel');
        this.item = null;
        this.onSpeedChange = this.onSpeedChange.bind(this);

        this.bindControls();
    }

    bindControls() {
        this.el.querySelector('#emitter-speed').addEventListener('input', this.onSpeedChange);
        this.el.querySelector('button.close').addEventListener('click', () => this.close());
    }

    onSpeedChange(event) {
        if (this.item === null) {
            return;
        }

        const speed = event.target.value;

        this.el.querySelector('#emitter-speed-value').textContent = speed;
        this.item.speed = speed;
    }

    open(item) {
        this.el.classList.toggle('panel-closed', false);
        this.item = item;
    }

    close() {
        this.el.classList.toggle('panel-closed', true);
        this.item = null;
    }
}

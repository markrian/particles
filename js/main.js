import log from './log.js';
import { canvas, ctx, clear } from './canvas.js';
import animation from './animation.js';
import forces from './forces.js';
import RadialForce from './radialforce.js';
import ConstantForce from './constantforce.js';
import Emitter from './emitter.js';
import state from './state.js';
import World from './world.js';
import bindEvents from './bind-events.js';
import keyboardEvents from './keyboard-events.js';
import mouseEvents from './mouse-events.js';
import resizeEvents from './resize-events.js';

log('Ready');

function initOld() {
    forces.add([
        new RadialForce(
            ctx,
            state.width / 2 + 50,
            state.height / 2,
            -10
        ),
        new RadialForce(
            ctx,
            state.width / 2,
            state.height / 2 + 50,
            80
        ),
        new ConstantForce(0, 2),
    ]);

    const emitter = new Emitter(
        ctx,
        state.width / 2,
        state.height / 2,
        60, // Frequency
        2000, // Particle pool size
        100, // Particle speed
        -Math.PI * 3 / 4, // Start angle
        -Math.PI * 3 / 4 // End angle
    );

    animation.add(
        clear,
        emitter.update.bind(emitter),
        forces.draw.bind(forces),
        emitter.draw.bind(emitter)
    );

    animation.start();

    document.body.addEventListener('click', _ => {
        animation.toggle();
    });

    canvas.addEventListener('mousemove', event => {
        const x = event.pageX - canvas.offsetLeft;
        const y = event.pageY - canvas.offsetTop;

        emitter.x = x;
        emitter.y = y;
    });
}

function init() {
    bindEvents(window, keyboardEvents);
    bindEvents(window, mouseEvents);
    bindEvents(window, resizeEvents);

    const world = new World(state);
    const dt = 1000 / 60;

    function loop() {
        requestAnimationFrame(loop);
        world.update(dt);
        // world.draw();
    }

    loop();
}

init();

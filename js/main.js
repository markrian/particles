import log from './log.js';
import canvas from './canvas.js';
import animation from './animation.js';
import forces from './forces.js';
import RadialForce from './radialforce.js';
import ConstantForce from './constantforce.js';
import Emitter from './emitter.js';

log('Ready');

forces.add([
    new RadialForce(
        canvas.ctx,
        canvas.ctx.canvas.width / 2 + 50,
        canvas.ctx.canvas.height / 2,
        -10
    ),
    new RadialForce(
        canvas.ctx,
        canvas.ctx.canvas.width / 2,
        canvas.ctx.canvas.height / 2 + 50,
        80
    ),
    new ConstantForce(0, 2),
]);

const emitter = new Emitter(
    canvas.ctx,
    canvas.ctx.canvas.width / 2,
    canvas.ctx.canvas.height / 2,
    60, // Frequency
    2000, // Particle pool size
    100, // Particle speed
    -Math.PI * 3 / 4, // Start angle
    -Math.PI * 3 / 4 // End angle
);

animation.add(
    canvas.clear,
    emitter.update.bind(emitter),
    forces.draw.bind(forces),
    emitter.draw.bind(emitter)
);

animation.start();

document.body.addEventListener('click', _ => {
    animation.toggle();
});

canvas.ctx.canvas.addEventListener('mousemove', event => {
    const x = event.pageX - canvas.ctx.canvas.offsetLeft;
    const y = event.pageY - canvas.ctx.canvas.offsetTop;

    emitter.x = x;
    emitter.y = y;
});

import log from './log.js';
import canvas from './canvas.js';
import Particles from './particles.js';
import animation from './animation.js';
import forces from './forces.js';
import RadialForce from './radialforce.js';
import ConstantForce from './constantforce.js';
import Emitter from './emitter.js';

log("Ready");

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
    new ConstantForce(0, 2)
]);

var emitter = new Emitter(
    canvas.ctx,
    canvas.ctx.canvas.width / 2,
    canvas.ctx.canvas.height / 2,
    60, // frequency
    2000, // particle pool size
    100, // particle speed
    -Math.PI * 3 / 4, // start angle
    -Math.PI * 3 / 4 // end angle
);

animation.add(
    canvas.clear,
    emitter.update.bind(emitter),
    forces.draw.bind(forces),
    emitter.draw.bind(emitter)
);

animation.start();

document.body.onclick = function (event) {
    animation.toggle();
};

canvas.ctx.canvas.addEventListener("mousemove", function onMouseMove(event) {
    var x = event.pageX - canvas.ctx.canvas.offsetLeft;
    var y = event.pageY - canvas.ctx.canvas.offsetTop;

    emitter.x = x;
    emitter.y = y;
});

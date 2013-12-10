require([
    "log",
    "canvas",
    "particles",
    "animation",
    "emitter"
    ], function (log, canvas, Particles, animation, Emitter) {
    log("Ready");

    var emitter = new Emitter(
        canvas.ctx.canvas.width / 2,
        canvas.ctx.canvas.height / 2,
        20, // frequency
        20 // particle speed
    );

    animation.add(
    );

    animation.start();

    document.body.onclick = function (event) {
        animation.toggle();
    };
});
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
        4, // frequency
        20, // particle pool size
        20, // particle speed
        canvas.ctx
    );

    animation.add(
        canvas.clear,
        emitter.update.bind(emitter),
        emitter.draw.bind(emitter)
    );

    animation.start();

    document.body.onclick = function (event) {
        animation.toggle();
    };
});
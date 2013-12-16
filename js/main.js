require([
    "log",
    "canvas",
    "particles",
    "animation",
    "emitter"
    ], function (log, canvas, Particles, animation, Emitter) {
    log("Ready");

    var emitter = new Emitter(
        canvas.ctx,
        canvas.ctx.canvas.width / 2,
        canvas.ctx.canvas.height / 2,
        4, // frequency
        20, // particle pool size
        20, // particle speed
        -0.5, // start angle
        0.5 // end angle
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

    canvas.ctx.canvas.addEventListener("mousemove", function onMouseMove(event) {
        var x = event.pageX - canvas.ctx.canvas.offsetLeft;
        var y = event.pageY - canvas.ctx.canvas.offsetTop;

        emitter.x = x;
        emitter.y = y;
    });
});
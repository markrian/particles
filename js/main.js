require([
    "log",
    "canvas",
    "particles",
    "animation"
    ], function (log, canvas, Particles, animation) {
    log("Ready");

    var particles = new Particles(20, canvas.ctx);

    animation.add(
        canvas.clear,
        particles.draw.bind(particles),
        particles.update.bind(particles)
    );

    animation.start();

    document.body.onclick = function (event) {
        animation.toggle();
    };
});
require([
    "log",
    "canvas",
    "particles",
    "animation"
    ], function (log, canvas, Particles, animation) {
    log("Ready");

    var particles = new Particles(20);

    animation.add(
        canvas.clear,
        particles.draw.bind(particles, canvas.ctx),
        particles.randomise.bind(particles)
    );

    animation.start();

    document.body.onclick = function (event) {
        animation.toggle();
    };
});
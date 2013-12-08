require([
    "log",
    "ctx",
    "particles",
    "animation"
    ], function (log, ctx, Particles, animation) {
    log("Ready");

    var particles = new Particles(20);

    animation.add(Particles.draw);
    // animation.start();
});
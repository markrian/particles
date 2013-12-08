require([
    "log",
    "ctx",
    "particles"
    ], function (log, ctx, Particles) {
    log("Ready");

    var particles = new Particles(20);

    particles.draw(ctx);
});
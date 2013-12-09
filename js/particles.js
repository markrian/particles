define([
    "particle",
    "random"
    ], function (Particle, random) {

    function Particles(number, speed, ctx) {
        this.particles = [];

        for (var i = 0; i < number; i++) {
            var particle = new Particle(
                ctx,
                random.between(0, ctx.canvas.width),
                random.between(0, ctx.canvas.height),
                random.between(-speed, speed),
                random.between(-speed, speed)
            );
            this.add(particle);
        }
    }

    Particles.prototype.add = function add(particle) {
        this.particles.push(particle);
    };

    Particles.prototype.draw = function draw() {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].draw();
        }
    };

    Particles.prototype.update = function update(timestamp) {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].update(timestamp);
        }
    };

    Particles.prototype.randomise = function refresh() {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].randomise();
        }
    };

    return Particles;
});
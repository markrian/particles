define([
    "particle",
    "random"
    ], function (Particle, random) {

    function Particles(number) {
        this.particles = [];

        for (var i = 0; i < number; i++) {
            var particle = new Particle(random.between(0, 800),
                                        random.between(0, 450));
            this.add(particle);
        }
    }

    Particles.prototype.add = function add(particle) {
        this.particles.push(particle);
    };

    Particles.prototype.draw = function draw(ctx) {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].draw(ctx);
        }
    };

    return Particles;
});
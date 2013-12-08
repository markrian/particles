define([
    "particle",
    "random"
    ], function (Particle, random) {

    var MAX_X = 800;
    var MAX_Y = 450;

    function Particles(number, ctx) {
        this.particles = [];

        for (var i = 0; i < number; i++) {
            var particle = new Particle(
                ctx,
                random.between(0, MAX_X),
                random.between(0, MAX_Y),
                random.between(-20, 20),
                random.between(-20, 20)
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

    Particles.prototype.update = function (timestamp) {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].update(timestamp);
        }
    };

    Particles.prototype.randomise = function refresh() {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].x = random.between(0, 800);
            this.particles[i].y = random.between(0, 450);
        }
    };

    return Particles;
});
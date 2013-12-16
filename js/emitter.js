define(["particle"], function (Particle) {

    function Emitter(x, y, frequency, number, speed, ctx) {
        this.x = x;
        this.y = y;
        this.frequency = frequency;
        this.speed = speed;
        this.pool = [];
        this.particles = [];
        this.ctx = ctx;
        this._initParticles(number);
    }

    Emitter.prototype.update = function update(timestamp) {
        var dt = timestamp - (this.timestamp || 0);

        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].update(timestamp);
        }

        this.timestamp = timestamp;
    };

    Emitter.prototype.draw = function draw() {
        var number = this.particles.length;
        for (var i = 0; i < number; i++) {
            this.particles[i].draw();
        }
    };

    Emitter.prototype._initParticles = function _initParticles(number) {
        for (var i = 0; i < number; i++) {
            this.particles.push(
                new Particle(
                    this.ctx,
                    this.x,
                    this.y,
                    this.speed,
                    0,
                    Date.now()
                )
            )
        }
    };

    return Emitter;

});
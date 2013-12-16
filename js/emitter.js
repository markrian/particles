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
        this.emit(timestamp);

        // Update existing particles
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

    Emitter.prototype._emit = function (timestamp) {
        var particle = this.pool.pop();

        // Hack? Make sure it starts in the right position.
        particle.timestamp = timestamp;

        this.particles.push(particle);
        this._lastEmission = timestamp;
    };

    Emitter.prototype.emit = function (timestamp) {
        var lastEmission = this._lastEmission || timestamp;
        var dt = timestamp - lastEmission;

        // If we've never emitted before
        if (!dt) {
            this._emit(timestamp);
        }

        // Add particles from pool
        var toEmit = Math.floor(this.frequency * dt / 1000);
        for (var i = 0; i < toEmit; i++) {
            if (this.pool.length) {
                console.log("Emitting " + (i+1) + " of " + toEmit + " particles...");
                console.log(this.frequency, dt);
                this._emit(timestamp);
                console.log("pool: ", this.pool.length, "particles:", this.particles.length);
            }
        }
    };

    Emitter.prototype._initParticles = function _initParticles(number) {
        for (var i = 0; i < number; i++) {
            this.pool.push(
                new Particle(
                    this.ctx,
                    this.x,
                    this.y,
                    this.speed,
                    0,
                    0
                )
            );
        }
    };

    return Emitter;

});
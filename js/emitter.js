define(["particle"], function (Particle) {

    function Emitter(x, y, frequency, number, speed, ctx) {
        this.x = x;
        this.y = y;
        this.frequency = frequency;
        this.speed = speed;
        this.pool = [];
        this.particles = [];
        this.ctx = ctx;
        this.number = number;
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
        var particle = this._nextParticle();

        particle.setProps({
            x: this.x,
            y: this.y,
            vx: this.speed,
            vy: 0,

            // Hack? Make sure it starts in the right position.
            timestamp: timestamp
        });
        this._lastEmission = timestamp;
    };

    Emitter.prototype._nextParticle = function () {
        var particle;
        this._current = this._current || 0;

        if (this.pool.length) {
            particle = this.pool.pop();
            this.particles.push(particle);
        } else {
            particle = this.particles[this._current % this.number];
            this._current++;
        }

        return particle;
    };

    Emitter.prototype.emit = function (timestamp) {
        var lastEmission = this._lastEmission || timestamp;
        var dt = timestamp - lastEmission;

        // If we've never emitted before
        if (!dt) {
            this._emit(timestamp);
        }

        var toEmit = Math.floor(this.frequency * dt / 1000);
        for (var i = 0; i < toEmit; i++) {
            console.log("Emitting " + (i+1) + " of " + toEmit + " particles...");
            console.log(this.frequency, dt);
            this._emit(timestamp);
            console.log("pool: ", this.pool.length, "particles:", this.particles.length);
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
                    0
                )
            );
        }
    };

    return Emitter;

});
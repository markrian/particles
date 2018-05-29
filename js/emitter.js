define(['particle', 'random'], (Particle, random) => {
    function Emitter(
        ctx,
        x,
        y,
        frequency,
        number,
        speed,
        startAngle,
        endAngle
    ) {
        this.x = x;
        this.y = y;
        this.frequency = frequency;
        this.speed = speed;
        this.pool = [];
        this.particles = [];
        this.ctx = ctx;
        this.number = number;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this._initParticles(number);
    }

    Emitter.prototype.update = function update(timestamp) {
        this.emit(timestamp);

        // Update existing particles
        const number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].update(timestamp);
        }

        this.timestamp = timestamp;
    };

    Emitter.prototype.draw = function draw() {
        const number = this.particles.length;
        for (let i = 0; i < number; i++) {
            this.particles[i].draw();
        }
    };

    Emitter.prototype._emit = function (timestamp) {
        const particle = this._nextParticle();
        const angle = random.betweenFloat(this.startAngle, this.endAngle);

        particle.setProps({
            x: this.x,
            y: this.y,
            vx: this.speed * Math.cos(angle),
            vy: this.speed * Math.sin(angle),

            // Hack? Make sure it starts in the right position.
            timestamp,
        });
        this._lastEmission = timestamp;
    };

    Emitter.prototype._nextParticle = function () {
        let particle;
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
        const lastEmission = this._lastEmission || timestamp;
        const dt = timestamp - lastEmission;

        // If we've never emitted before
        if (!dt) {
            this._emit(timestamp);
        }

        const toEmit = Math.floor(this.frequency * dt / 1000);
        for (let i = 0; i < toEmit; i++) {
            // Console.log("Emitting " + (i+1) + " of " + toEmit + " particles...");
            // console.log(this.frequency, dt);
            this._emit(timestamp);
            // Console.log("pool: ", this.pool.length, "particles:", this.particles.length);
        }
    };

    Emitter.prototype._initParticles = function _initParticles(number) {
        for (let i = 0; i < number; i++) {
            this.pool.push(
                new Particle(this.ctx, 0, 0, 0, 0)
            );
        }
    };

    return Emitter;
});

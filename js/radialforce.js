define(function () {
    function RadialForce(ctx, x, y, strength) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.direction = strength >= 0 ? 1 : -1;
        this.strength = Math.abs(strength);

        this._preDraw();
    }

    RadialForce.prototype.resolve = function (particle, dt) {
        var direction = [
            particle.x - this.x,
            particle.y - this.y
        ];
        var distance_squared = direction[0] * direction[0] + 
            direction[1] * direction[1];

        if (this.direction < 0) {
            distance_squared = Math.sqrt(distance_squared);
        }

        var fx = this.strength * this.direction * direction[0] / distance_squared;
        var fy = this.strength * this.direction * direction[1] / distance_squared;
        particle.vx += fx;
        particle.vy += fy;
    };

    RadialForce.prototype.draw = function () {
        this.ctx.drawImage(this._canvas, this.x - this.strength, this.y - this.strength);
    };

    RadialForce.prototype._preDraw = function () {
        var c = this._canvas = document.createElement("canvas");
        c.width = c.height = this.strength*2;
        var ctx = c.getContext("2d");
        var radialGradient = ctx.createRadialGradient(
            this.strength,
            this.strength,
            0,
            this.strength,
            this.strength,
            this.strength
        );
        var color = "0,0,127";
        radialGradient.addColorStop(0, "rgba("+color+",1)");
        radialGradient.addColorStop(1, "rgba("+color+",0)");
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, this.strength*2, this.strength*2);
    };

    return RadialForce;
});
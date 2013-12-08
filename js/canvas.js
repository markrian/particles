define(function () {
    var ctx = document.getElementById("view")
                      .getContext("2d");

    var canvas = {
        ctx: ctx,
        clear: function clear() {
            ctx.canvas.width = ctx.canvas.width;
        }
    };

    return canvas;
});
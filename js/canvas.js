const ctx = document.getElementById("view")
    .getContext("2d");

export default {
    ctx,
    clear() {
        ctx.canvas.width = ctx.canvas.width;
    }
};
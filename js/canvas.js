const ctx = document.getElementById('view')
    .getContext('2d');

export default {
    ctx,
    clear() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
};

export default class Moveable {
    static update(entity, state) {
        if (entity.selected) {
            if (state.keys.pressed.Delete || state.keys.pressed.d) {
                entity.remove();
                return;
            }

            if (state.keys.live.ArrowUp) entity.y--;
            if (state.keys.live.ArrowDown) entity.y++;
            if (state.keys.live.ArrowLeft) entity.x--;
            if (state.keys.live.ArrowRight) entity.x++;
        }

        if (state.mouse.dragging && state.draggingItem === entity) {
            entity.x = state.mouse.x;
            entity.y = state.mouse.y;
        }
    }
}

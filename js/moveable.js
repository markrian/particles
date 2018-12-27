import { drawDisc, drawReticle } from './canvas.js';

export default class Moveable {
    constructor(entity) {
        this.entity = entity;
        this.hovered = this.selected = false;
    }

    update(dt, state) {
        this.hovered = state.hoveredItem === this.entity;
        this.selected = state.selectedItem === this.entity;

        if (this.selected) {
            if (state.keys.pressed.Delete || state.keys.pressed.d) {
                this.entity.remove();
                return;
            }

            if (state.keys.live.ArrowUp) this.entity.y--;
            if (state.keys.live.ArrowDown) this.entity.y++;
            if (state.keys.live.ArrowLeft) this.entity.x--;
            if (state.keys.live.ArrowRight) this.entity.x++;
        }

        if (state.mouse.dragging && state.draggingItem === this.entity) {
            this.entity.x = state.mouse.x;
            this.entity.y = state.mouse.y;
        }
    }

    draw() {
        if (this.hovered) {
            drawDisc(this.entity.world.ctx, this.entity.x, this.entity.y, 15, 'rgba(12,230,240,.3)');
        }

        if (this.selected) {
            drawReticle(this.entity.world.ctx, this.entity.x, this.entity.y);
        }
    }
}

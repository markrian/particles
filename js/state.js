export default {
    width: 640,
    height: 480,
    keys: {
        live: {
        },
        old: {
        },
        pressed: {
        },
    },
    mouse: {
        x: 0,
        y: 0,
        oldClick: false,
        click: false,
        down: false,
        downStart: {
            x: null,
            y: null,
        },
        downEnd: {
            x: null,
            y: null,
        },
        dragging: false,
    },
    paused: false,
    draggingItem: null,
    hoveredItem: null,
    selectedItem: null,
};


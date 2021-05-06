export const camera = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: {
        x: 10, y: 0, z: 80
    },
    look: {
        x: 10, y: 0, z: 0
    },
    controller: {
        rotateSpeed: 5,
        zoomSpeed: -2,
        panSpeed: 0.5,
        enabled: true
    },
    isHelperVisible: false
}

export const renderer = {
    color: 0xAAAAAA
}

export const lights = {
    spotLight: {
        color: 0xffffff,
        intensity: 0.7,
        position: {
            x: 20,
            y: 40,
            z: 40
        },
        isHelperVisible: false
    },
    ambientLight: {
        color: 0xccddee,
        intensity: 0.35,
    }
}

export const scene = {
    canvasName: '#WebGL-output',
    axesHelper: {
        size: 1,
        visible: true
    }
}

export const game = {
    piece: {
        width: 4,
        height: 1,
        holeRadius: 1.5,
        holeHeight: 0.5,
        segments: 32
    },
    board: {
        piecesX: 7,
        piecesY: 6,
        separationX: 0.5,
        separationY: 0.5,
        separationZ: 0.1,
        base: {
            height: 0.4,
            depth: 20
        },
        border: {
            depth: 0.1
        }
    }
}

export const menu = {
    menuId: "menu",
    buttons: {
        restartId: "btn-restart"
    }
}
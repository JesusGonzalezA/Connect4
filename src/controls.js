export const camera = {
    fov: 45,
    near: 0.1,
    far: 100,
    position: {
        x: 6, y: 3, z: 6
    },
    look: {
        x: 0, y: 0, z: 0
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
        intensity: 0.5,
        position: {
            x: 6,
            y: 6,
            z: 4
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
        visible: false
    }
}

export const game = {
    piece: {
        width: 2,
        height: 1,
        holeRadius: 1.5,
        holeHeight: 0.6,
        segments: 32
    }
}
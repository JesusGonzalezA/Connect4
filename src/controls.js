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
    controls: {
        rotateSpeed: 5,
        zoomSpeed: -2,
        panSpeed: 0.5
    }
}

export const renderer = {
    color: 0xAAAAAA
}

export const lights = {
    spotLight: {
        color: 0xffffff,
        intensity: 0.5,
        position: {
            x: 60,
            y: 60,
            z: 40
        }
    },
    ambientLight: {
        color: 0xccddee,
        intensity: 0.35,
    }
}

export const scene = {
    cameraControls: true,
    axesHelper: {
        size: 1,
        visible: true
    }
}
export const camera = {
    fov: 45,
    near: 0.1,
    far: 300,
    velocity: 2250,
    position: {
        x: 0, y: 40, z: 100
    },
    radius: 60,
    look: {
        x: 0, y: 20, z: 0
    },
    controller: {
        rotateSpeed: 5,
        zoomSpeed: -2,
        panSpeed: 0.5,
        enabled: false
    },
    isHelperVisible: false
}

export const renderer = {
    color: 0xAAAAAA,
    eventOnLoaded: 'rendered'
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
        isHelperVisible: false,
        isShadowHelperVisible: false,
        shadow: {
            mapSize: {
                width: 1024,
                height: 1024
            },
            near: 1,
            far: 100
        }
    },
    ambientLight: {
        color: 0xccddee,
        intensity: 0.35,
    }
}

export const scene = {
    canvasName: '#WebGL-output',
    id: 'WebGL-output',
    axesHelper: {
        size: 1,
        visible: false
    }
}

export const game = {
    piece: {
        materials: {
            player1: 'assets/textures/pieces/matcap_plastic_yellow.jpg',
            player2: 'assets/textures/pieces/matcap_metal.png'
        },
        width: 4,
        height: 1,
        holeRadius: 1.5,
        holeHeight: 0.5,
        segments: 32,
        sound: 'assets/sounds/202546__deraj__drops-and-bounces.wav'
    },
    board: {
        piecesX: 7,
        piecesY: 6,
        separationX: 0.5,
        separationY: 0.5,
        separationZ: 0.1,
        separationPieceMove: 0.5,
        separationPieceReference: 15,
        base: {
            height: 0.4,
            depth: 20
        },
        border: {
            depth: 0.1
        },
        pickable: {
            offset: 1
        },
        material: 'assets/textures/board/matcap_metal.png'
    },
    columnMarker: {
        fontJSON: './assets/fonts/helvetiker_regular.typeface.json',
        separation: 5.5,
        bevelEnabled: false,
        size: 2,
        opacity: 0.3,
        color: 0x0000ff
    }
}

export const menu = {
    menuId: "menu",
    buttons: {
        restartId: "btn-restart"
    }
}

export const spinner = {
    id: 'spinner'
}

export const table = {
    width: 60,
    height: 1,
    depth: 60,
    materials: {
        map:          'assets/textures/table/WoodFloor043_1K_Color.jpg',
        occlusion:    'assets/textures/table/WoodFloor043_1K_AmbientOcclusion.jpg',
        displacement: 'assets/textures/table/WoodFloor043_1K_Displacement.jpg',
        metalness:    'assets/textures/table/WoodFloor043_1K_Metalness.jpg',
        normal:       'assets/textures/table/WoodFloor043_1K_Normal.jpg',
        roughness:    'assets/textures/table/WoodFloor043_1K_Roughness.jpg',    
    }
}
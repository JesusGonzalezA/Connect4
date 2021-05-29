export const camera = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: {
        x: 0, y: 40, z: 100
    },
    look: {
        x: 0, y: 20, z: 0
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
        materials: {
            player1: 'assets/textures/pieces/matcap_plastic_yellow.jpg',
            player2: 'assets/textures/pieces/matcap_metal.png'
        },
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
        size: 2
    }
}

export const menu = {
    menuId: "menu",
    buttons: {
        restartId: "btn-restart"
    }
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
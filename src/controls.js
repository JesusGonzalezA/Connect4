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
        intensity: 0.5,
        position: {
            x: -40,
            y: 50,
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
        intensity: 0.5,
    }
}

export const scene = {
    canvasName: '#WebGL-output',
    id: 'WebGL-output',
    axesHelper: {
        size: 1,
        visible: false
    },
    urlTextures: 'assets/textures/scene/veranda/',
    extension: 'png'
}

export const game = {
    piece: {
        materials: {
            player1: 'assets/textures/pieces/matcap_plastic_yellow.jpg',
            player2: 'assets/textures/pieces/matcap_purple.png'
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
        opacity: 0.5,
        color: 0xffffff
    }
}

export const menu = {
    menuId: "menu",
    winnerMenuId: "winnerMenu",
    winnerId: "winner",
    winnerPId: "winnerP",
    tiePId: "tieP",
    buttons: {
        restartClass: "btn-restart"
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

export const confetti = {
    count: 400,
    defaults: {
        origin: { y: 0.7 }
    },
    fires: [
        {
            particleRatio: 0.25,
            opts: {
                spread: 100,
                startVelocity: 55,
            }
        },
        {
            particleRatio: 0.2,
            opts: {
                spread: 100,
            }
        },
        {
            particleRatio: 0.35,
            opts: {
                spread: 200,
                decay: 0.91,
                scalar: 0.8
            }
        },
        {
            particleRatio: 0.1,
            opts: {
                spread: 300,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2
            }
        },
        {
            particleRatio: 0.1,
            opts: {
                spread: 200,
                startVelocity: 45,
            }
        },
    ]
}
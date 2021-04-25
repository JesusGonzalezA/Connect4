import * as THREE from '/vendor/three.module.js'

import { PiecesController } from './PiecesController.js'


class Game extends THREE.Object3D {
    
    constructor ( controls ) {
        super()
        
        const piecesController = new PiecesController( controls.piece )
        this.add(piecesController.createPiece())
    }

    update () {

    }

}

export { Game }
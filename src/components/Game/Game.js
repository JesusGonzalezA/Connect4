import * as THREE from '/vendor/three.module.js'

import { Board } from './Board.js'
import { PiecesController } from './PiecesController.js'


class Game extends THREE.Object3D {
    
    constructor ( controls ) {
        super()
        
        this.createBoard( controls )
        this.piecesController = new PiecesController( controls.piece )
        // this.add( this.piecesController.createPiece() )
    }

    createBoard ( controls ) {
        this.board = new Board( controls )
        this.add( this.board )
    }

    update () {

    }

}

export { Game }
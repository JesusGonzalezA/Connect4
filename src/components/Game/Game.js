import * as THREE from '/vendor/three.module.js'

import { Board } from './Board.js'
import { PiecesController } from './Piece/PiecesController.js'
import { gameStates } from './gameStates.js'


class Game extends THREE.Object3D {
    
    constructor ( controls ) {
        super()
        
        this.createBoard( controls )
        this.piecesController = new PiecesController( controls.piece )

        this.addPiece()
    }

    createBoard ( controls ) {
        this.board = new Board( controls )
        this.add( this.board )
    }

    addPiece () {
        const pieza = this.piecesController.createPiece( gameStates.PLAYER_2 )
        
        pieza.rotation.x = Math.PI / 2
        pieza.position.set (0.5 + 2,2+0.5,0)
        this.add(pieza)
    }

    update () {

    }

}

export { Game }
import * as THREE from '/vendor/three.module.js'

import { Board } from './Board.js'
import { PiecesController } from './Piece/PiecesController.js'
import { Vector3 } from '../../../vendor/three.module.js'


class Game extends THREE.Object3D {
    
    constructor ( controls ) {
        super()

        this.controls = controls 
        
        this.createBoard( this.controls )
        this.piecesController = new PiecesController( this.controls.piece )
    }

    getControls () {
        return this.controls
    }

    getAllPieces () {
        return this.children.filter( (piece, index) => {
            if ( index!==0 ) return piece
        })
    }

    createBoard ( controls ) {
        this.board = new Board( controls )
        this.add( this.board )
    }

    addPiece ( pieceType, row, column ) {
        if ( row === null ) return;
        
        const position = this.getPosition( row, column )
        const pieza = this.piecesController.createPiece( pieceType, position )

        this.add(pieza)
    }

    getPosition ( row, column ) {
        const { separationX, separationY } = this.controls.board 
        const { width } = this.controls.piece
        
        const radius = width / 2
        const advanceX = width + separationX
        const advanceY = width + separationY
        const initialX = radius + separationX
        const initialY = radius + separationY
        const y = initialY + row * advanceY
        const x = initialX + column * advanceX
        
        return new Vector3( x, y, 0)
    }

    deleteAllPieces () {
        const pieces = this.getAllPieces()
        pieces.map( (piece) => this.remove(piece) )
    }

    update () {

    }

}

export { Game }
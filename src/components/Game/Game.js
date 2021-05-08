import * as THREE from '/vendor/three.module.js'

import { Board } from './Board.js'
import { PiecesController } from './Piece/PiecesController.js'

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

    getDimensions () {
        return {
            piecesX: this.controls.board.piecesX,
            piecesY: this.controls.board.piecesY
        }
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

    setActiveColumnMarker ( column, boolean ) {
        this.board.setActiveColumnMarker( column, boolean )
        
    }

    addPiece ( pieceType, row, column ) {
        if ( row === null ) return;

        // Add piece
        const position = this.getPosition( row, column )
        const pieza = this.piecesController.createPiece( pieceType, position )

        this.add(pieza)
    }

    getPosition ( row, column ) {
        return this.board.getPosition( row, column )
    }

    deleteAllPieces () {
        const pieces = this.getAllPieces()
        pieces.map( (piece) => this.remove(piece) )
    }

    nextPlayer () {
        this.rotation.y += Math.PI
    }

    update () {

    }

}

export { Game }
import * as THREE from '../../../vendor/three.module.js'

import { Board } from './Board.js'
import { playerStates } from './states/playerStates.js'
import { PiecesController } from './Piece/PiecesController.js'
import { pieceTypes } from './Piece/pieceTypes.js'

class Game extends THREE.Object3D {
    
    constructor ( controls, camera ) {
        super()

        this.camera      = camera
        this.controls    = controls 
        this.pieces      = []
        this.activePiece = null
        this.state       = playerStates.IDLE
        
        this.createBoard( this.controls )
        this.piecesController = new PiecesController( this.controls.piece )

        this.raycaster = new THREE.Raycaster()
        
        this.createReferencePieces()
    }

    createReferencePieces () {
        this.piecePlayer1     = this.piecesController.createPiecePlayer1( new THREE.Vector3(0,0,15) )
        this.piecePlayer2     = this.piecesController.createPiecePlayer2( new THREE.Vector3(0,0,-15) )
        this.add( this.piecePlayer1, this.piecePlayer2 )
    }

    getReferencePiece ( piece ) {
        if ( piece === pieceTypes.PLAYER_1) 
            return [ this.piecePlayer1.getMesh() ]
        if ( piece === pieceTypes.PLAYER_2) 
            return [ this.piecePlayer2.getMesh() ]
    }

    getControls () {
        return this.controls
    }

    getCamera() {
        return this.camera
    }

    getDimensions () {
        return {
            piecesX: this.controls.board.piecesX,
            piecesY: this.controls.board.piecesY
        }
    }

    getAllPieces () {
        return this.pieces
    }

    createBoard ( controls ) {
        this.board = new Board( controls )
        this.add( this.board )
    }

    addPiece ( pieceType, row, column ) {
        if ( row === null ) return;

        // Add piece
        const position = this.getPosition( row, column )
        const piece = this.piecesController.createPiece( pieceType, position )

        this.add( piece )
        this.pieces.push( piece )
    }

    activeColumnMarker ( column ) {
        this.board.setActiveColumnMarker( column, true )
    }

    getPosition ( row, column ) {
        return this.board.getPosition( row, column )
    }

    deleteAllPieces () {
        const pieces = this.getAllPieces()
        pieces.map( (piece) => this.remove(piece) )
    }

    selectPiece( x, y, pieceType ){
        this.raycaster.setFromCamera(
            new THREE.Vector2(x, y), 
            this.getCamera()
        )   

        const objectsToSelect = this.getReferencePiece( pieceType )
        const intersects      = this.raycaster.intersectObjects( objectsToSelect )
        
        if ( intersects.length ) {
            this.activePiece = intersects[0].object.parent
            this.activePiece.setSelected( true )
            this.state = playerStates.MOVE
        }
    }

    movePiece ( x, y ) {
        if ( this.state === playerStates.MOVE ){
            this.activePiece.position.z = 0
        }
        
    }

    endMove () {
        this.state = playerStates.IDLE  
    }

    nextPlayer ( player ) {
        this.board.columnMarker.nextPlayer( player )
    }

    restart () {
        this.deleteAllPieces()
        this.rotation.y = 0

        // Restart column marker
        this.board.restart()
    }

    update () {

    }

}

export { Game }
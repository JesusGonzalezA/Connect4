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

    activeColumnMarker ( column ) {
        this.board.setActiveColumnMarker( column, true )
    }

    addPiece ( pieceType, row, column ) {
        if ( row === null ) return;

        // Add piece
        const position = this.getPosition( row, column )
        const piece = this.piecesController.createPiece( pieceType, position )

        this.add( piece )
        this.pieces.push( piece )

        this.state = playerStates.IDLE
    }

    cancelMove () {
        this.resetReferencePieces()
        this.board.resetColumnMarker()
        this.state = playerStates.IDLE
    }

    createBoard ( controls ) {
        this.board = new Board( controls )
        this.add( this.board )
    }

    createReferencePieces () {
        const positionArr = this.getPositionReferencePieces() 
        this.piecePlayer1     = this.piecesController.createPiecePlayer1( 
            positionArr[0]
        )
        this.piecePlayer2     = this.piecesController.createPiecePlayer2( 
            positionArr[1]
        )
        this.add( this.piecePlayer1, this.piecePlayer2 )
    }

    deleteAllPieces () {
        const pieces = this.getAllPieces()
        pieces.map( (piece) => this.remove(piece) )
        this.pieces = []
    }

    endMove () {
        this.state = playerStates.IDLE  
    }

    getActiveColumn () {
        return this.board.getActiveColumn()
    }

    getAllPieces () {
        return this.pieces
    }

    getCamera() {
        return this.camera
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

    getPosition ( row, column ) {
        return this.board.getPosition( row, column )
    }

    getPositionReferencePieces() {
        const separation = this.controls.board.separationPieceReference
        const { x, y, z } = this.position

        return [
            {
                x, 
                y,
                z: z + separation
            },
            {
                x, 
                y, 
                z: z - separation
            }
        ]
    }

    getReferencePiece ( piece ) {
        if ( piece === pieceTypes.PLAYER_1) 
            return this.piecePlayer1
        if ( piece === pieceTypes.PLAYER_2) 
            return this.piecePlayer2
    }

    getState() {
        return this.state
    }

    intersect ( x, y, objects ) {
        this.raycaster.setFromCamera(
            new THREE.Vector2(x, y), 
            this.getCamera()
        )

        return this.raycaster.intersectObjects( objects )
    }

    moveLeft () {
        const x = this.activePiece.position.x
        const actualColumn = this.board.getColumnFromX( x )
        let column = actualColumn
        
        if ( actualColumn > 0 ) {
            this.activePiece.position.x -= this.board.getColumnWidth()
            column--
        }

        return column 
    }

    movePiece ( x, y ) {        
        const objectsToSelect = this.board.getPickableBoard()
        const intersects      = this.intersect( x, y, [ objectsToSelect ] )
        
        if ( intersects.length ) {
            const { point } = intersects[0]
            let { x } = point

            const side = this.board.getBoardWidth()/2 
                - this.controls.piece.width/2
                - this.controls.board.separationX

            const limitR = this.position.x + side
            const limitL = this.position.x - side
            
            if ( x > limitR ) {
                x = limitR                
            } else if ( x < limitL ) {
                x = limitL
            } 
            
            this.activePiece.position.x = x - this.position.x
            const column = this.board.getColumnFromX( x - this.position.x )

            return column
        }
        return null
    }

    moveRight () {
        const x = this.activePiece.position.x
        const actualColumn = this.board.getColumnFromX( x )
        let column = actualColumn

        if ( actualColumn < (this.controls.board.piecesX - 1) ) {
            this.activePiece.position.x += this.board.getColumnWidth()
            column++
        }

        return column 
    }

    nextPlayer ( player ) {
        this.board.columnMarker.nextPlayer( player )
    }

    startMove () {
        this.state = playerStates.MOVE
    }

    selectPiece( x, y, pieceType ){  
        const objectsToSelect = [ this.getReferencePiece( pieceType ).getMesh() ]
        const intersects      = this.intersect( x, y, objectsToSelect )
        
        if ( intersects.length ) {
            this.setActivePiece( intersects[0].object.parent )
            this.state = playerStates.MOVE
        
            return Math.floor(this.controls.board.piecesX / 2)
        }
        return false
    }

    setActivePiece( piece ) {
        this.activePiece = piece
        this.activePiece.setSelected( true )
        this.activePiece.setPosition({
            x: 0, 
            y: this.board.getBoardHeight() 
                + this.controls.piece.width/2 
                + this.controls.board.separationPieceMove,
            z: 0
        })
    }

    resetReferencePieces() {
        const positionArr = this.getPositionReferencePieces()
        
        this.piecePlayer1.setPosition( positionArr[0] )
        this.piecePlayer2.setPosition( positionArr[1] )
        
        this.piecePlayer1.setSelected( false )
        this.piecePlayer2.setSelected( false )
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
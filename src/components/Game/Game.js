import * as THREE from '../../../vendor/three.module.js'
import * as TWEEN from '../../../vendor/tween.esm.js'

import { Board } from './Board.js'
import { playerStates } from './states/playerStates.js'
import { PiecesController } from './Piece/PiecesController.js'
import { pieceTypes } from './Piece/pieceTypes.js'

class Game extends THREE.Object3D {
    
    constructor ( controls, camera ) {
        super()

        this.raycaster   = new THREE.Raycaster()
        this.camera      = camera
        this.controls    = controls 
        this.pieces      = []
        this.activePiece = null
        this.state       = playerStates.IDLE
        
        this.createBoard( this.controls )
        this.piecesController = new PiecesController( this.controls.piece )
        this.createReferencePieces()

        this.position.y = controls.board.base.height / 2

        // Sound
        this.animatedPieces = []
        this.hitSound = new Audio( controls.piece.sound )
    }

    activeColumnMarker ( column ) {
        this.board.setActiveColumnMarker( column, true )
    }

    addPiece ( pieceType, row, column ) { 
        if ( row === null ) return;

        // Add piece
        const finalPosition   = this.getPosition( row, column )
        const initialPosition = new THREE.Vector3(
            finalPosition.x,
            this.getPositionYReferencePiece(),
            finalPosition.z
        )
        
        const piece = this.piecesController.createPiece( pieceType, initialPosition )
        this.pieces.push( piece )        
        this.add( piece )
        this.createAnimationAddPiece( piece, initialPosition, finalPosition )

        this.state = playerStates.IDLE
    }

    cancelMove () {
        this.resetReferencePieces()
        this.board.resetActiveColumnMarker()
        this.state = playerStates.IDLE
    }

    createAnimationAddPiece( piece, initialPosition, finalPosition ) {
        
        const object = { 
            indexPiece: this.pieces.indexOf(piece), 
            finalPosition: finalPosition.y 
        }
        this.animatedPieces.push( object )

        const start  = { t: 0};
        const end    = { t: 1 };
        const length = Math.abs(initialPosition.y - finalPosition.y)

        const animation = new TWEEN.Tween(start)
            .to(end, 750)
            .onUpdate( () => {
                const y = initialPosition.y - start.t * length
                piece.position.y = y
            })
            .easing(TWEEN.Easing.Bounce.Out)
            .start()
            
    }

    createBoard ( controls ) {
        this.board = new Board( controls )
        this.add( this.board )
    }

    createReferencePieces () {
        const positionArr = this.getPositionReferencePieces() 
        this.piecePlayer1     = this.piecesController.createRefencePiecePlayer1( 
            positionArr[0]
        )
        this.piecePlayer2     = this.piecesController.createRefencePiecePlayer2( 
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

    getBoard () {
        return this.board
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

    getPositionYReferencePiece () {
        return this.board.getBoardHeight() 
            + this.controls.piece.width/2 
            + this.controls.board.separationPieceMove
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
        const midPiece = Math.floor(this.controls.board.piecesX/2)
        const x = this.board.getPosition(0, midPiece).x
        
        this.activePiece.setPosition({
            x, 
            y: this.getPositionYReferencePiece(),
            z: 0
        })
        this.activePiece.setRotation( Math.PI / 2, 0, 0)
    }

    resetReferencePieces() {
        const positionArr = this.getPositionReferencePieces()
        
        this.piecePlayer1.setPosition( positionArr[0] )
        this.piecePlayer2.setPosition( positionArr[1] )
        
        this.piecePlayer1.setSelected( false )
        this.piecePlayer2.setSelected( false )

        this.piecePlayer1.setRotation( 0, 0, 0 )
        this.piecePlayer2.setRotation( 0, 0, 0 )
    }

    restart () {        
        this.deleteAllPieces()

        // Restart column marker
        this.board.restart()        
    }

    update () {
        TWEEN.update()

        // Sound
        this.animatedPieces.forEach( (object) => {
            const piece = this.pieces[ object.indexPiece ]
            if ( Math.abs( piece.position.y - object.finalPosition ) < this.controls.piece.width/2 ) {
                this.hitSound.currentTime = 0
                this.hitSound.play()
                
                this.animatedPieces.splice(this.animatedPieces.indexOf(object),1)
            }
        })

        requestAnimationFrame( () => this.update() )
    }

}

export { Game }
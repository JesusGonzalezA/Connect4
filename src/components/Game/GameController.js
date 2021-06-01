
import { gameStates } from './states/gameStates.js'
import { pieceTypes } from './Piece/pieceTypes.js'
import { playerStates } from './states/playerStates.js'

class GameController {

    constructor ( game, camera ) {
        this.game      = game
        this.camera    = camera
        
        this.initializeGame()
        
        const { piecesX, piecesY } = this.game.getDimensions()
        this.createBoardState( piecesX, piecesY )

        this.update()
        this.onEndGame = new Event( "endGame" )
    }

    addPiece ( column ) {
        // Check not possible
        if ( this.camera.getAnimating() ) return false
        if ( this.state !== gameStates.PLAYER_1 && this.state !== gameStates.PLAYER_2 ) 
            return false
        if ( column >= this.boardState[0].length ) 
            return false
        
        // Get column
        let columnMarker  = column
        let columnGame    = this.getColumnFromState( column )
        
        // Get row
        const row    = this.getRow( columnGame )
        if ( row === null ) return
        
        // Add piece to scene        
        this.game.addPiece( this.getPieceType(), row, columnGame )
        this.game.activeColumnMarker( columnMarker )

        // Add piece to board state
        this.addPieceToBoardState( row, columnGame )
        
        this.lastRow = row 
        this.lastColumn  = columnGame
        this.getGame().resetReferencePieces()

        // Update state
        this.nextState()
        return true
    }

    addPieceAfterMove () {
        if ( this.getGame().getState() === playerStates.MOVE )
        {
            const column = this.game.getActiveColumn()
            this.addPiece( column )
        }
    }

    addPieceToBoardState( row, column ) {
        const pieceType = this.state
        this.boardState[row][column] = pieceType
    }

    cancelMove () {
        this.game.cancelMove()
    }

    checkGameOver () {

        const pieceType = ( this.state === gameStates.PLAYER_1 ) 
            ? pieceTypes.PLAYER_1 
            : pieceTypes.PLAYER_2
        let isGameOver = false

        // Vertical
        let counterVertical = 1
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow - i, this.lastColumn ) ) break;

            counterVertical++
            if ( counterVertical===4 ) isGameOver = true
        }
        
        //Horizontal
        let counterHorizontal = 1
            // To right
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow, this.lastColumn + i ) ) break;
            
            counterHorizontal++
            if ( counterHorizontal===4 ) isGameOver = true
        }

            // To left
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow, this.lastColumn - i ) ) break;

            counterHorizontal++
            if ( counterHorizontal===4 ) isGameOver = true
        }

        // Diagonal
        let counterDiagonal = 1
            // Up - Right
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow + i, this.lastColumn + i ) ) break;

            counterDiagonal++
            if ( counterDiagonal===4 ) isGameOver = true
        }
            // Down - Left
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow - i, this.lastColumn - i ) ) break;
            
            counterDiagonal++
            if ( counterDiagonal===4 ) isGameOver = true
        }


        counterDiagonal = 1
            // Up - Left
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow + i, this.lastColumn - i ) ) break;
            
            counterDiagonal++
            if ( counterDiagonal===4 ) isGameOver = true
        }
            // Down - Right
        for ( let i=1; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow - i, this.lastColumn + i ) ) break;
            
            counterDiagonal++
            if ( counterDiagonal===4 ) isGameOver = true
        }

        if ( isGameOver ) {
            this.state  = gameStates.END
            this.winner = pieceType
        }
    }

     /**
     * Return
     *  - 1 : if the piece in the board is typePiece
     *  - 0 : if it does not match or it is out of bounds
     */
    checkPiece ( typePiece, row, column ) {
        try {
            return this.boardState[row][column] === typePiece
        } catch {
            return 0
        }
    }

    checkTie () {
        const { piecesX, piecesY } = this.game.getDimensions()
        const numPieces            = this.game.getAllPieces().length
        
        if ( ( piecesX * piecesY ) === numPieces )
            this.state = gameStates.TIE
    }

    createBoardState ( piecesX, piecesY ) {
        
        this.boardState = new Array( piecesY )

        for ( let i = 0; i < piecesY; ++i ){
            this.boardState[i] = new Array( piecesX )
        }
        
        this.initializeBoardState()
    }

    endMove () {
        this.getGame().endMove()
    }

    getCamera () {
        return this.camera
    }

    getColumnFromState( column ) {
        const { piecesX } = this.getGame().getDimensions()
        const columnPlayer2 = (piecesX - column) - 1

        return ( this.state === gameStates.PLAYER_2 ) ? columnPlayer2 : column
    }

    getGame () {
        return this.game
    }

    getPieceType () {
        const pieceType = ( this.state ===  gameStates.PLAYER_1 )
            ? pieceTypes.PLAYER_1
            : pieceTypes.PLAYER_2

        return pieceType
    }
    
    getRow ( column ) {
        let row = null
        let index = 0
        while( index < this.boardState.length 
                && this.boardState[index][column] !== null)
        {
            index++
        }
        
        if ( index < this.boardState.length )
            row = index

        return row
    }

    getState () {
        return this.state
    }

    getWinner () {
        return this.winner
    }

    initializeGame () {
        this.state = gameStates.PLAYER_1
        this.lastRow = this.lastColumn = -1   
        this.winner  = null
    }

    initializeBoardState () {
        for ( let i = 0; i < this.boardState.length; ++i )
            for ( let j=0; j < this.boardState[0].length; ++j)
                this.boardState[i][j] = null
    }

    moveArrow ( callback ) {
        if ( this.state === gameStates.END || this.state === gameStates.TIE )
            return

        if ( this.getGame().getState() === playerStates.IDLE ) {
            this.startMoveFromArrow()            
        } else {
            const column = callback.apply( this.getGame() )
            this.getGame()
                .activeColumnMarker( this.getColumnFromState( column ) )
        }
    }

    moveLeft () {
        
        const callback = ( this.state === gameStates.PLAYER_2 )
            ? this.getGame().moveRight
            : this.getGame().moveLeft
        
        this.moveArrow( callback )
    }

    movePiece ( x, y ) {
        if ( this.getGame().getState() !== playerStates.MOVE )
            return 
            
        let column = this.getGame().movePiece(x, y)
        if ( column !== null ) {
            column = this.getColumnFromState( column )
            this.game.activeColumnMarker( column )
        }
    }
    
    moveRight () {
        
        const callback = ( this.state === gameStates.PLAYER_2 )
            ? this.getGame().moveLeft
            : this.getGame().moveRight
        
        this.moveArrow( callback )
    }

    nextState () {

        this.checkGameOver()
        this.checkTie()

        switch ( this.state ) {
            case gameStates.PLAYER_1:
                this.state = gameStates.PLAYER_2
                this.game.nextPlayer()
                this.camera.nextPlayer()
                break;
            case gameStates.PLAYER_2:
                this.state = gameStates.PLAYER_1
                this.game.nextPlayer()
                this.camera.nextPlayer()
                break;
            case gameStates.END:
                document.dispatchEvent( this.onEndGame )
                break;
            case gameStates.TIE:
                document.dispatchEvent( this.onEndGame )
                break;
        }

    }
    
    restart () {
        this.camera.restart()
        this.game.restart()
        this.initializeBoardState()
        this.initializeGame()
    }
    
    selectPiece ( x, y ) {
        if ( this.getGame().getState() !== playerStates.IDLE )
            return 

        let pieceType = ( this.state === gameStates.PLAYER_1 )
            ? pieceTypes.PLAYER_1 
            : pieceTypes.PLAYER_2
        
        const selected = this.getGame().selectPiece( x, y, pieceType )
        
        if ( selected !== false )
            this.game.activeColumnMarker( selected )
    }

    startMoveFromArrow(){
        let pieceType = ( this.state === gameStates.PLAYER_1 )
            ? pieceTypes.PLAYER_1 
            : pieceTypes.PLAYER_2

        const referencePiece = this.getGame().getReferencePiece( pieceType )
        this.getGame().setActivePiece( referencePiece )
        this.getGame().activeColumnMarker( 
            Math.floor(this.getGame().getDimensions().piecesX / 2)
        )
        this.getGame().startMove()
        
    }

    update() {
        this.getGame().update()
    }

}

export { GameController }

import { gameStates } from './gameStates.js'
import { pieceTypes } from './Piece/pieceTypes.js'

class GameController {

    constructor ( game ) {
        this.game = game
        this.state = gameStates.PLAYER_1
        this.lastRow = this.lastColumn = -1        
        
        const { piecesX, piecesY } = this.game.getControls().board
        this.createBoardState( piecesX, piecesY )
    }

    createBoardState ( piecesX, piecesY ) {
        
        this.boardState = new Array( piecesY )

        for ( let i = 0; i < piecesY; ++i ){
            this.boardState[i] = new Array( piecesX )

            for ( let j=0; j < piecesX; ++j)
                this.boardState[i][j] = null
        }
        
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

    addPiece ( column ) {
        if ( column >= this.boardState[0].length) return;

        const row    = this.getRow( column )
        
        if ( row === null ) return; 

        // Add piece to scene
        this.game.addPiece( this.getPieceType(), row, column )

        // Add piece to board state
        this.addPieceToBoardState( row, column )
        this.lastRow = row 
        this.lastColumn  = column

        // Update state
        this.nextState()
    }

    getPieceType () {
        const pieceType = ( this.state ===  gameStates.PLAYER_1 )
            ? pieceTypes.PLAYER_1
            : pieceTypes.PLAYER_2

        return pieceType
    }

    addPieceToBoardState( row, column ) {
        const pieceType = this.state
        this.boardState[row][column] = pieceType
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

    checkGameOver () {

        const pieceType = ( this.state === gameStates.PLAYER_1 ) 
            ? pieceTypes.PLAYER_1 
            : pieceTypes.PLAYER_2
        let isGameOver = false

        // Vertical
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow - i, this.lastColumn ) ) break;
            if ( i===3 ) isGameOver = true
        }
        
        //Horizontal
            // To right
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow, this.lastColumn + i ) ) break;
            if ( i===3 ) isGameOver = true
        }

            // To left
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow, this.lastColumn - i ) ) break;
            if ( i===3 ) isGameOver = true
        }

        // Diagonal
            // Up - Right
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow + i, this.lastColumn + i ) ) break;
            if ( i===3 ) isGameOver = true
        }
            // Up - Left
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow + i, this.lastColumn - i ) ) break;
            if ( i===3 ) isGameOver = true
        }
            // Down - Right
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow - i, this.lastColumn + i ) ) break;
            if ( i===3 ) isGameOver = true
        }
            // Down - Left
        for ( let i=0; i<4 && !isGameOver; ++i ) {
            if ( !this.checkPiece( pieceType, this.lastRow - i, this.lastColumn - i ) ) break;
            if ( i===3 ) isGameOver = true
        }

        if ( isGameOver )
            this.state = gameStates.END
    }
    
    nextState () {

        this.checkGameOver()

        switch ( this.state ) {
            case gameStates.PLAYER_1:
                this.state = gameStates.PLAYER_2
                break;
            case gameStates.PLAYER_2:
                this.state = gameStates.PLAYER_1
                break;
            case gameStates.END:
                console.log("Fin")
                break;
        }

    }
}

export { GameController }
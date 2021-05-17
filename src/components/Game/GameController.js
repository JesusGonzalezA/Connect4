
import { gameStates } from './states/gameStates.js'
import { pieceTypes } from './Piece/pieceTypes.js'

class GameController {

    constructor ( game, camera ) {
        this.game      = game
        this.camera    = camera
        
        this.initializeGame()
        
        const { piecesX, piecesY } = this.game.getDimensions()
        this.createBoardState( piecesX, piecesY )
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

    getWinner () {
        return this.winner
    }
    
    getState () {
        return this.state
    }

    getCamera () {
        return this.camera
    }

    getGame () {
        return this.game
    }

    createBoardState ( piecesX, piecesY ) {
        
        this.boardState = new Array( piecesY )

        for ( let i = 0; i < piecesY; ++i ){
            this.boardState[i] = new Array( piecesX )
        }
        
        this.initializeBoardState()
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
        // Check not possible
        if ( this.state !== gameStates.PLAYER_1 && this.state !== gameStates.PLAYER_2 ) return;
        if ( column >= this.boardState[0].length ) return;
        
        // Get column
        const { piecesX } = this.getGame().getDimensions()
        const columnPlayer1 = column 
        const columnPlayer2 = (piecesX - column) - 1
        let columnMarker  = column
        let columnGame    = columnPlayer1
        if ( this.state === gameStates.PLAYER_2 )
        {
            columnGame   = columnPlayer2
        }
        
        // Get row
        const row    = this.getRow( columnGame )
        if ( row === null ) return; 
        
        // Add piece to scene
        this.game.addPiece( this.getPieceType(), row, columnGame )
        this.game.activeColumnMarker( columnMarker )

        // Add piece to board state
        this.addPieceToBoardState( row, columnGame )
        this.lastRow = row 
        this.lastColumn  = columnGame

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

    checkTie () {
        const { piecesX, piecesY } = this.game.getDimensions()
        const numPieces            = this.game.getAllPieces().length
        
        if ( ( piecesX * piecesY ) === numPieces )
            this.state = gameStates.TIE
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
                console.log("Fin")
                break;
            case gameStates.TIE:
                console.log("Tie")
                break;
        }

    }

    selectPiece ( x, y ) {
        let pieceType
        if ( this.state === gameStates.PLAYER_1 ) pieceType = pieceTypes.PLAYER_1 
        if ( this.state === gameStates.PLAYER_2 ) pieceType = pieceTypes.PLAYER_2
        this.getGame().selectPiece( x, y, pieceType )  
    }

    movePiece ( x, y ) {
        this.getGame().movePiece(x, y)
    }

    endMove () {
        this.getGame().endMove()
    }

    restart () {
        this.camera.restart()
        this.game.restart()
        this.initializeBoardState()
        this.initializeGame()
    }
}

export { GameController }
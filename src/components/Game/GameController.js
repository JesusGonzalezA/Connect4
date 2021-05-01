
import { gameStates } from './gameStates.js'
import { pieceTypes } from './Piece/pieceTypes.js'

class GameController {

    constructor ( game ) {
        this.game = game

        const { piecesX, piecesY } = this.game.getControls().board
        this.state = gameStates.PLAYER_1
        
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

        this.game.addPiece( this.getPieceType(), row, column )
        this.addPieceToBoardState( row, column )
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
    
    nextState () {
        switch ( this.state ) {
            case gameStates.PLAYER_1:
                this.state = gameStates.PLAYER_2
                break;
            case gameStates.PLAYER_2:
                this.state = gameStates.PLAYER_1
                break;
        }
    }
}

export { GameController }
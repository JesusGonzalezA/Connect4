import { Piece } from './Piece.js'

class ReferencePiece extends Piece {
    
    constructor( geometry, material, position ) {
        super( geometry, material, position )        
    }

    initialize() {        
        const { geometry, material, position } = this.args 
        
        this.material = material.clone()

        this.createMesh( geometry, this.material )
        this.setPosition( position )

        this.add( this.mesh )
    }

}

export { ReferencePiece }
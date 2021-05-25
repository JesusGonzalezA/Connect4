import { Piece } from './Piece.js'

class ReferencePiece extends Piece {
    
    constructor( geometry, material, position ) {
        super( geometry, material, position )        
    }

    initialize() {
        console.log('hi');
        
        const { geometry, material, position } = this.args 
        
        this.material = material.clone()

        this.createMesh( geometry, this.material )
        this.setPosition( position )
        this.setRotation( Math.PI/2, 0, 0)

        this.add( this.mesh )
    }

}

export { ReferencePiece }
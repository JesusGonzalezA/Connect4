import * as THREE from '../../../../vendor/three.module.js'
import { TextureLoader } from "../../../TextureLoader.js"
import { Piece } from './Piece.js'
import { ReferencePiece } from './ReferencePiece.js'

class PieceGenerator {

    constructor ( geometry, materialURI ) {
        this.geometry = geometry
        this.material = this.createMaterial( materialURI )
    }
    
    createMaterial ( materialURI ) {
        const textureLoader = TextureLoader.getInstance()
        const texture = textureLoader.load( materialURI )
        return new THREE.MeshMatcapMaterial({ matcap: texture })
    }

    createPiece ( position ) {
        const piece = new Piece( this.geometry, this.material, position )
        piece.initialize() 

        return piece
    }

    createPieceReference ( position ) {
        const piece = new ReferencePiece( this.geometry, this.material, position )
        piece.initialize()
        
        return piece
    }
    
}

export { PieceGenerator }
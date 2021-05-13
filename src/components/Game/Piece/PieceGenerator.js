import * as THREE from '../../../../vendor/three.module.js'
import { TextureLoader } from "../../../TextureLoader.js"
import { Piece } from './Piece.js'

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
        return new Piece( this.geometry, this.material, position );
    }
    
}

export { PieceGenerator }
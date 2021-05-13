import * as THREE from '../../../../vendor/three.module.js'
import { TextureLoader } from "../../../TextureLoader.js"

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
        const mesh = new THREE.Mesh( this.geometry, this.material )
        mesh.rotation.x = Math.PI / 2
        mesh.position.copy( position )
        
        return mesh;
    }
    
}

export { PieceGenerator }
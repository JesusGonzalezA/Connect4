import * as THREE from '/vendor/three.module.js'
import { TextureLoader } from "../../../TextureLoader.js"

class FactoryPlayer1 {

    constructor ( geometry ) {
        this.geometry = geometry
        this.material = this.createMaterial()
    }
    
    createMaterial () {
        const textureLoader = TextureLoader.getInstance()
        const texture = textureLoader.load('/assets/textures/pieces/matcap_yellow.png')
        return new THREE.MeshMatcapMaterial({ matcap: texture})
    }

    createPiece ( position ) {
        const mesh = new THREE.Mesh( this.geometry, this.material )
        mesh.rotation.x = Math.PI / 2
        mesh.position.copy( position )
        
        return mesh;
    }
    
}

export { FactoryPlayer1 }
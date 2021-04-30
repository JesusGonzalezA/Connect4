import * as THREE from '/vendor/three.module.js'
import { TextureLoader } from "../../../TextureLoader.js"

class FactoryPlayer2 {

    constructor ( geometry ) {
        this.geometry = geometry
        this.material = this.createMaterial()
    }
    
    createMaterial () {
        const textureLoader = TextureLoader.getInstance()
        const texture = textureLoader.load('/assets/textures/pieces/matcap_metal.png')
        return new THREE.MeshMatcapMaterial({ matcap: texture})
    }
    
    createPiece () {
        return new THREE.Mesh( this.geometry, this.material )
    }
    
}

export { FactoryPlayer2 }
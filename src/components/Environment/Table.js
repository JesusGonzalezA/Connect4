import * as THREE from '../../../vendor/three.module.js'
import { textureLoader } from '../../TextureLoader.js'

class Table extends THREE.Object3D {

    constructor( controls ) {
        super()

        this.createMesh( controls )
    }

    createGeometry ( { width, height, depth }) {
        this.geometry = new THREE.BoxBufferGeometry(
            width, height, depth
        )
        return this.geometry
    }

    createMaterial ( { materials } ) {
        const textures = this.loadTextures( materials )
        return new THREE.MeshStandardMaterial({
            aoMapIntensity: 1,
            ...textures
        })
    }

    createMesh ( controls ) {
        const mesh = new THREE.Mesh( 
            this.createGeometry( controls ), 
            this.createMaterial( controls )
        )
        mesh.position.y    = -controls.height / 2
        mesh.receiveShadow = true

        this.add( mesh )
    }

    loadTextures( materials ) {
        return {
            map:             textureLoader.load( materials.map ),
            aoMap:           textureLoader.load( materials.occlusion ),
            metalnessMap:    textureLoader.load( materials.metalness ),
            roughnessMap:    textureLoader.load( materials.roughness ),
            normalMap:       textureLoader.load( materials.normal )
        }
    }

}

export { Table }
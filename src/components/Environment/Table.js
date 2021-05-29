import * as THREE from '../../../vendor/three.module.js'

class Table extends THREE.Object3D {

    constructor( controls ) {
        super()

        this.createMesh( controls )
    }

    createGeometry ( { width, height, depth }) {
        return new THREE.BoxBufferGeometry(
            width, height, depth
        )
    }

    createMaterial () {
        return new THREE.MeshNormalMaterial(

        )
    }

    createMesh ( controls ) {
        const mesh = new THREE.Mesh( 
            this.createGeometry( controls ), 
            this.createMaterial()
        )
        mesh.position.y = -controls.height / 2
        this.add( mesh )
    }


}

export { Table }
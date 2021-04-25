import * as THREE from '../../../vendor/three.module.js'
import { ThreeBSP } from '../../../vendor/ThreeBSP.js'

class Piece extends THREE.Object3D {
 
    constructor ( controls ) {
        super()

        this.controls = controls
        this.add( this.createMesh() )
    }

    createMesh () {
        return new THREE.Mesh(
            this.createGeometry(),
            this.createMaterial()
        )
    }

    createMaterial () {
        return new THREE.MeshLambertMaterial({
            color: 0xff0000, 
            wireframe: false
        })
    }

    createGeometry () {
        const geometryIn  = new THREE.CylinderGeometry( 
            this.controls.holeRadius, 
            this.controls.holeRadius, 
            this.controls.height / 2,
            32,1 
        )
        const geometryOut = new THREE.CylinderGeometry( 
            this.controls.width,
            this.controls.width,
            this.controls.height,
            32, 1 
        )
        const geometryHole = new THREE.CylinderGeometry( 
            this.controls.holeRadius,
            this.controls.holeRadius,
            this.controls.height,
            32, 1 
        )
        
        const geometryBSP      = new ThreeBSP( geometryOut )
                                    .subtract( new ThreeBSP( geometryHole ) )
                                    .union( new ThreeBSP( geometryIn ) )

        const geometry       = geometryBSP.toGeometry()
        
        const bufferGeometry = new THREE
                                    .BufferGeometry()
                                    .fromGeometry( geometry )
        
        return bufferGeometry
    }
}

export { Piece }
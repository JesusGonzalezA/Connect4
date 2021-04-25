import * as THREE from '../../../vendor/three.module.js'
import { ThreeBSP } from '../../../vendor/ThreeBSP.js'

class Piece extends THREE.Object3D {
 
    constructor ( controls, color ) {
        super()

        this.add( this.createMesh( controls, color ) )
    }

    createMesh ( controls, color ) {
        return new THREE.Mesh(
            this.createGeometry( controls ),
            this.createMaterial( color )
        )
    }

    createMaterial ( color ) {
        return new THREE.MeshLambertMaterial({
            color
        })
    }

    createGeometry ( controls ) {

        const { width, height, holeRadius, holeHeight, segments } = controls 
        
        const geometryIn  = new THREE.CylinderGeometry( 
            holeRadius, 
            holeRadius, 
            holeHeight,
            segments,1 
        )
        const geometryOut = new THREE.CylinderGeometry( 
            width,
            width,
            height,
            segments, 1 
        )
        const geometryHole = new THREE.CylinderGeometry( 
            holeRadius,
            holeRadius,
            height,
            segments, 1 
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
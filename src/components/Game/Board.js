import * as THREE from '../../../vendor/three.module.js'
import { ThreeBSP } from '../../../vendor/ThreeBSP.js'

class Board extends THREE.Object3D {
    
    constructor ( controls ) {
        super()

        this.add( this.createMesh( controls ) )
    }

    createMesh ( controls ) {
        return new THREE.Mesh(
            this.createGeometry( controls ), 
            this.createMaterial()
        )
    }

    createMaterial () {
        return new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xff0000
        })
    }

    createGeometry ( controls ) {
        
        // Definitions
        const { 
            piecesX, piecesY, 
            separationX, separationZ, separationY 
        } = controls.board 
        const { width, height, segments } = controls.piece    

        const boardWidth  = ( piecesX * ( width + separationX ) ) + separationX
        const boardHeight = ( piecesY * ( width + separationY ) ) + separationY 
        const boardDepth  = height + ( 2 * separationZ )

        // Create geometries
        const geometryBoard = new THREE.BoxGeometry(
            boardWidth, boardHeight, boardDepth
        )

        const geometryHole  = new THREE.CylinderGeometry( 
            width / 2,
            width / 2,
            boardDepth,
            segments, 1
        )
        geometryHole.rotateX( Math.PI / 2 )
            
        // Remove holes
        const geometryBoardBSP = new ThreeBSP( geometryBoard )
        let geometryBSP = geometryBoardBSP

        const advanceX = width + separationX
        const advanceY = width + separationY
        const initialX = - boardWidth  / 2 + width / 2 + separationX
        const initialY = - boardHeight / 2 + width / 2 + separationY
        
        geometryHole.translate(initialX, initialY, 0)
        for ( let row = 0; row < piecesY; ++row ) {
            for ( let column = 0; column < piecesX; ++column ){
                const geometryHoleBSP = new ThreeBSP( geometryHole )
                geometryBSP = geometryBSP.subtract(geometryHoleBSP)
                geometryHole.translate(advanceX, 0, 0)
            }
            geometryHole.translate( -advanceX * piecesX, advanceY, 0)
        }     
        
        // Create buffer geometry
        const geometry       = geometryBSP.toGeometry()
        const bufferGeometry = new THREE
                                    .BufferGeometry()
                                    .fromGeometry( geometry )
        
        return bufferGeometry
    }

}

export { Board }
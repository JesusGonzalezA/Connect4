import * as THREE from '../../../../vendor/three.module.js'
import { ThreeBSP } from '../../../../vendor/ThreeBSP.js'

import { PieceGenerator } from "./PieceGenerator.js"
import { pieceTypes } from './pieceTypes.js'

class PiecesController {

    constructor ( controls ) {
        const pieceGeometry = this.createPieceGeometry( controls )
        this.pieceGenerator1 = new PieceGenerator( pieceGeometry, controls.materials.player1 )
        this.pieceGenerator2 = new PieceGenerator( pieceGeometry, controls.materials.player2 )
    }
    
    createPieceGeometry ( controls ) {

        const { width, height, holeRadius, holeHeight, segments } = controls
        const radius = width / 2  
        
        const geometryIn  = new THREE.CylinderGeometry( 
            holeRadius, 
            holeRadius, 
            holeHeight,
            segments,1 
        )
        const geometryOut = new THREE.CylinderGeometry( 
            radius,
            radius,
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

    createPiece ( state, position ) {
        const pieceGenerator = ( state === pieceTypes.PLAYER_1 )
            ? this.pieceGenerator1 
            : this.pieceGenerator2

        return pieceGenerator.createPiece( position )
    }


}

export { PiecesController }
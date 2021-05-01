import * as THREE from '../../../../vendor/three.module.js'
import { ThreeBSP } from '../../../../vendor/ThreeBSP.js'

import { FactoryPlayer1 } from "./FactoryPlayer1.js"
import { FactoryPlayer2 } from "./FactoryPlayer2.js"
import { pieceTypes } from './pieceTypes.js'

class PiecesController {

    constructor ( controls ) {

        const pieceGeometry = this.createPieceGeometry( controls )
        this.factoryPlayer1 = new FactoryPlayer1( pieceGeometry )
        this.factoryPlayer2 = new FactoryPlayer2( pieceGeometry )
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
        const factory = ( state === pieceTypes.PLAYER_1 )
            ? this.factoryPlayer1 
            : this.factoryPlayer2

        return factory.createPiece( position )
    }


}

export { PiecesController }
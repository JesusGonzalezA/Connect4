import * as THREE from '../../../vendor/three.module.js'

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
            wireframe: false,
            color: 0xff0000
        })
    }

    createGeometry ( controls ) {
        
        // Definitions
        const { 
            piecesX, piecesY, 
            separationX, separationZ, separationY 
        } = controls.board 
        const { width, height } = controls.piece    

        const boardWidth  = ( piecesX * ( width + separationX ) ) + separationX
        const boardHeight = ( piecesY * ( width + separationY ) ) + separationY 
        const boardDepth  = height + ( 2 * separationZ )

        // Board
        const board = 
            new THREE.Shape()
                .lineTo(boardWidth, 0)
                .lineTo(boardWidth, boardHeight)
                .lineTo(0, boardHeight)
                .lineTo(0,0)

        // Holes
        const radius = width / 2
        const advanceX = width + separationX
        const advanceY = width + separationY
        const initialX = radius + separationX
        const initialY = radius + separationY
        for ( let row = 0, y = initialY; row < piecesY; ++row ) {
            let x = initialX
            y = initialY + row * advanceY

            for ( let column = 0; column < piecesX; ++column ){
                const hole = new THREE.Shape().absarc(
                    x,y, 
                    radius, 0, 2 * Math.PI
                )
                board.holes.push( hole )
                x += advanceX
            }
        }     
        
        const geometry = new THREE.ExtrudeBufferGeometry(board, {
            depth: boardDepth,
            bevelEnabled: false
        })   
        geometry.translate( 0, 0, -boardDepth / 2 )
        return geometry
    }

}

export { Board }
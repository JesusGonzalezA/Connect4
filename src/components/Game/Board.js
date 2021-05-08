import * as THREE from '../../../vendor/three.module.js'
import { ThreeBSP } from '../../../vendor/ThreeBSP.js'

class Board extends THREE.Object3D {
    
    constructor ( controls ) {
        super()

        this.controls = controls
        this.add( this.createMeshBoard( controls ) )
        this.add( this.createMeshBase( controls ) )
        this.createBorders( controls )
        this.borders.forEach( (border) => this.add(border) )
    }
    
    createMaterial () {
        if ( !this.material )
            this.material = new THREE.MeshLambertMaterial({
                color: 0xff0000,
            })
        return this.material
    }
    
    createMeshBase ( controls ) {
        this.meshBase =  new THREE.Mesh(
            this.createGeometryBase( controls ), 
            this.material
        )
        this.meshBase.position.set(
            this.getBoardWith() / 2,
            - controls.board.base.height / 2,
            0
        )
        return this.meshBase
    }

    createBorders ( controls ) {
        this.borders = []
        const height = controls.board.separationY
        
        // Create geometry
        const borderGeometry = new THREE.BoxBufferGeometry(
            this.getBoardWith(),
            height,
            controls.board.depth
        )

        // Create front border
        const borderFront = new THREE.Mesh(
            borderGeometry,
            this.material
        )
        borderFront.position.set(
            this.getBoardWith() / 2,
            height / 2,
            this.getBoardDepth() / 2
        )

        // Create back border
        const borderBack = new THREE.Mesh(
            borderGeometry,
            this.material
        )
        borderBack.position.set(
            this.getBoardWith() / 2,
            height / 2,
            -this.getBoardDepth() /2
        )

        // Add borders
        this.borders.push(borderFront, borderBack)
    }

    createMeshBoard ( controls ) {
        this.boardMesh = new THREE.Mesh(
            this.createGeometryBoard( controls ), 
            this.createMaterial()
        )
        this.boardMesh.position.set(0,0, -this.getBoardDepth()/2)
        return this.boardMesh
    }

    createGeometryBase ( controls ) {
        return new THREE.BoxBufferGeometry(
            this.getBoardWith(),
            controls.board.base.height,
            controls.board.base.depth
        )
    }

    getBoardWith (){
        const { piecesX, separationX } = this.controls.board 
        const { width } = this.controls.piece 
        return ( piecesX * ( width + separationX ) ) + separationX
    }

    getBooardHeight () {
        const { piecesY, separationY } = this.controls.board 
        const { width } = this.controls.piece 
        return ( piecesY * ( width + separationY ) ) + separationY 
    }

    getBoardDepth() {
        const { separationZ } = this.controls.board 
        const { height } = this.controls.piece 
        return height + ( 2 * separationZ )
    }

    createGeometryBoard ( controls ) {
        
        // Definitions
        const { 
            piecesX, piecesY, 
            separationX, separationY 
        } = controls.board 
        const { width, height } = controls.piece    

        const boardWidth  = this.getBoardWith()
        const boardHeight = this.getBooardHeight()
        const boardDepth  = this.getBoardDepth()

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
            // Pieces holes
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
        const initialGeometry = new THREE.ExtrudeGeometry(board, {
            depth: boardDepth,
            bevelEnabled: false
        })
        const initialGeometryBSP = new ThreeBSP( initialGeometry )
        let geometryBSP = initialGeometryBSP
            
            // Groove holes
        for ( 
            let column = 0, 
            x = initialX,
            y = boardHeight
            ; 
            column < piecesX
            ; 
            ++column 
        ){
            const hole = new THREE.BoxGeometry(
                width, separationY+2, height
            )
            hole.translate(x,y-separationY/2,this.getBoardDepth()/2)
            const holeBSP = new ThreeBSP(hole)
            geometryBSP = geometryBSP.subtract(holeBSP)

            x += advanceX
        }


        const geometry       = geometryBSP.toGeometry()
        const bufferGeometry = new THREE
                                    .BufferGeometry()
                                    .fromGeometry( geometry )

        geometry.center()
        return bufferGeometry
    }

    getPosition ( row, column ) {
        const { separationX, separationY } = this.controls.board 
        const { width } = this.controls.piece
        
        const radius = width / 2
        const advanceX = width + separationX
        const advanceY = width + separationY
        const initialX = this.position.x + radius + separationX
        const initialY = this.position.y + radius + separationY
        const y = initialY + row * advanceY
        const x = initialX + column * advanceX
        
        return new THREE.Vector3( x, y, this.position.z)
    }

}

export { Board }
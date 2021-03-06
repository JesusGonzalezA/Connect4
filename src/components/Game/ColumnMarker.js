import * as THREE from '../../../vendor/three.module.js'

class ColumnMarker extends THREE.Object3D {

    constructor ( controls, depth, positionY ) {
        super()
        
        this.loader = new THREE.FontLoader();

        // Variables
        this.active   = -1
        this.controls = controls
        const { piecesX, separationX } = controls.board
        const { 
            fontJSON, 
            bevelEnabled, 
            size,
            opacity,
            color
        }  = controls.columnMarker
        const { width }  = controls.piece
        const separation = separationX + width
        const options = {
            bevelEnabled,
            size,
            height: depth,
            opacity,
            color
        }

        // Create
        this.createColumnMarkers( fontJSON, piecesX, separation, options )

        // Set position
        this.position.y = positionY
        this.position.x = ( separationX + width/2 ) + (width+separationX) * (piecesX-1)/2
    }

    createColumnMarkers ( fontJSON, piecesX, separation, options ) {
        this.columnMarkers = []
        this.finalX = piecesX * separation - separation
        const initialX = - this.finalX / 2 
        
        this.loader.load( fontJSON, ( font ) => {
            options.font = font
            
            for ( let i=0 ; i < piecesX; ++i ) {
                const geometry = new THREE.TextGeometry( i.toString(), options )
                geometry.center()
                geometry.translate( initialX + i*separation, 0, 0 )

                const mesh     = new THREE.Mesh(
                    geometry, 
                    this.createMaterial( options.color, options.opacity )
                )
                this.add( mesh )
                this.columnMarkers.push( mesh )
            }

        } )
    }

    createMaterial ( color, opacity ) {
        return  new THREE.MeshBasicMaterial( {
            color,
            opacity,
            transparent: true,
        })
    }

    getHeight () {
        return this.controls.columnMarker.size / 2
    }

    nextPlayer () {
        this.rotation.y += Math.PI         
        
        const column = ( this.controls.board.piecesX - this.active ) - 1
        
        if ( this.active !== column ) {   
            this.setTransparent( column, false )
            this.setTransparent( this.active, true )             
            this.active = column 
        }
    }

    resetActive() {
        if ( this.active !== -1 ) {
            this.setTransparent( this.active, true )
            this.active = -1   
        }
    }

    restart() {
        this.active = -1
        this.columnMarkers.forEach( (_, index) => {
            this.setTransparent(index, true) 
        })
        this.rotation.y = 0
    }

    setActive ( column ) {        
        if ( this.active !== -1 )
            this.setTransparent( this.active, true )

        this.setTransparent( column, false ) 
        this.active = column
    }

    setTransparent ( column, boolean ) {
        this.columnMarkers[column].material.transparent = boolean
    }
}

export { ColumnMarker }
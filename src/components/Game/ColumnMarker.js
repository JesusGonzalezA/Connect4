import * as THREE from '../../../vendor/three.module.js'

class ColumnMarker extends THREE.Object3D {

    constructor ( controls, depth, positionY ) {
        super()
        
        this.controls = controls
        const { piecesX, separationX } = controls.board
        const { 
            fontJSON, 
            bevelEnabled, 
            size 
        }  = controls.columnMarker
        const { width }  = controls.piece
        const separation = separationX + width

        this.loader = new THREE.FontLoader();
        const options = {
            bevelEnabled,
            size,
            height: depth
        }
        this.createColumnMarkers( fontJSON, piecesX, separation, options )
        this.position.y = positionY
        this.position.x = ( separationX + width/2 ) + (width+separationX) * (piecesX-1)/2
    }

    createMaterial () {
        return  new THREE.MeshBasicMaterial( {
            color: 0x0000ff,
            transparent: true,
            opacity: 0.6
        })
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

                const mesh     = new THREE.Mesh(geometry, this.createMaterial())
                this.add( mesh )
                this.columnMarkers.push( mesh )
            }

        } )
    }

    getHeight () {
        return this.controls.columnMarker.size / 2
    }

    setActive ( column, activating ) {
        this.columnMarkers[column].material.transparent = !activating   
    }

    restart() {
        this.columnMarkers.forEach( (_, index) => this.setActive(index, false) )
    }
}

export { ColumnMarker }
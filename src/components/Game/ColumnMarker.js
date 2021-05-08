import * as THREE from '../../../vendor/three.module.js'

class ColumnMarker extends THREE.Object3D {

    constructor ( controls, depth ) {
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

        this.loader.load( fontJSON, ( font ) => {
            options.font = font
            
            for ( let i=0 ; i < piecesX; ++i ) {
                const geometry = new THREE.TextGeometry( i.toString(), options );
                geometry.center()

                const mesh     = new THREE.Mesh(geometry, this.createMaterial())
                mesh.position.x = i * separation

                this.add( mesh )
                this.columnMarkers.push( mesh )
            }

        } );
        
    }

    getHeight () {
        return this.controls.columnMarker.size / 2
    }

    setActive ( column, activating ) {
        this.columnMarkers[column].material.transparent = !activating   
    }

    getWidth () {
        const maxPosition = (this.columnMarkers[ this.columnMarkers.length - 1 ].position.x)
        const minPosition = (this.columnMarkers[ 0 ].position.x);
        return maxPosition - minPosition
    }
    rotate () {
        
    }
}

export { ColumnMarker }
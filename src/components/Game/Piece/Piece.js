import * as THREE from '../../../../vendor/three.module.js'

class Piece extends THREE.Object3D {
    
    constructor( geometry, material, position ) {
        super()

        this.args = {
            geometry, material, position
        }
    }

    initialize() {
        const { geometry, material, position } = this.args 
        
        this.material = material

        this.createMesh( geometry, this.material )
        this.setPosition( position )
        this.setRotation( Math.PI/2, 0, 0)    

        this.add( this.mesh )
    }

    createMesh( geometry, material ) {
        this.mesh = new THREE.Mesh( geometry, material )
    }

    getMesh() {
        return this.mesh
    }

    setPosition ( position ) {
        this.position.copy( position )
    }

    setRotation ( x, y, z) {
        this.rotation.set( x, y, z )
    }

    setSelected( boolean ) {
        this.material.transparent = boolean
        this.material.opacity     = 0.4
    }

}

export { Piece }
import * as THREE from '../../../../vendor/three.module.js'

class Piece extends THREE.Object3D {
    
    constructor( geometry, material, position ) {
        super()

        this.material = material

        this.createMesh( geometry, material )
        this.setPosition( position )
        this.setRotation( Math.PI/2, 0, 0)

        this.add( this.mesh )
    }

    getMesh() {
        return this.mesh
    }

    createMesh( geometry, material ) {
        this.mesh = new THREE.Mesh( geometry, material )
    }

    setPosition ( position ) {
        this.position.copy( position )
    }

    setRotation ( x, y, z) {
        this.rotation.set( x, y, z )
    }

    setSelected( boolean ) {
        this.material.opacity     = 0.8
        this.material.transparent = boolean
    }

}

export { Piece }
import * as THREE from '../../../vendor/three.module.js'

class Piece extends THREE.Object3D {
 
    constructor () {
        super()

        const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
        const geometry = new THREE.CylinderBufferGeometry()
        const mesh = new THREE.Mesh(geometry, material)
        this.add(mesh)
    }
}

export { Piece }
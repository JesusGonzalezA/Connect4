import * as THREE from '../../../vendor/three.module.js'

import { camera as camControls } from '../../controls.js'

class Camera extends THREE.PerspectiveCamera {

    constructor ( aspect ) {

        super(
            camControls.fov,
            aspect,
            camControls.near,
            camControls.far
        )

        this.position.set(
            camControls.position.x, 
            camControls.position.y, 
            camControls.position.z
        )

        this.setLookAt(  
            camControls.look.x, 
            camControls.look.y, 
            camControls.look.z 
        )

    }

    setCameraAspect ( ratio ) {
        this.aspect = ratio 
        this.updateProjectionMatrix() 
    }

    setLookAt ( x, y, z ) {
        this.look = new THREE.Vector3( x, y, z )
        this.lookAt( x, y, z )
    }

    getLook () {
        return this.look
    }
}

export { Camera }
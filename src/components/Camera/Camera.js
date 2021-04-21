import * as THREE from '../../../vendor/three.module.js'

class Camera extends THREE.PerspectiveCamera {

    constructor ( controls,  aspect ) {

        const { 
            fov, 
            near, 
            far, 
            position, 
            look
        } = controls

        super( fov, aspect, near, far )

        this.position.copy(position)

        this.setLookAt( look.x, look.y, look.z )

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
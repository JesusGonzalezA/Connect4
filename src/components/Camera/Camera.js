import * as THREE from '/vendor/three.module.js'

class Camera extends THREE.PerspectiveCamera {

    constructor ( controls,  aspect ) {

        const { 
            fov, 
            near, 
            far, 
            position, 
            look,
            isHelperVisible
        } = controls

        super( fov, aspect, near, far )

        this.position.copy(position)
        this.setLookAt( look.x, look.y, look.z )
        this.createHelper( isHelperVisible )
    }

    createHelper ( isHelperVisible ) {
        this.helper = new THREE.CameraHelper( this )
        this.setHelperVisibility( isHelperVisible )
    }

    getHelper () {
        return this.helper
    }

    setHelperVisibility ( isHelperVisible ) {
        this.helper.visible = isHelperVisible
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

    update () {
    }
}

export { Camera }
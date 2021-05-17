import * as THREE from '../../../vendor/three.module.js'

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
        
        this.initialPosition = position
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

    getLook () {
        return this.look
    }

    nextPlayer() {
        this.position.z *= -1
    }

    restart() {
        this.position.copy( this.initialPosition )
    }

    setCameraAspect ( ratio ) {
        this.aspect = ratio 
        this.updateProjectionMatrix() 
    }

    setHelperVisibility ( isHelperVisible ) {
        this.helper.visible = isHelperVisible
    }

    setLookAt ( x, y, z ) {
        this.look = new THREE.Vector3( x, y, z )
        this.lookAt( x, y, z )
    }  
    
}

export { Camera }
import * as THREE from '../../../vendor/three.module.js'
import * as TWEEN from '../../../vendor/tween.esm.js'

class Camera extends THREE.PerspectiveCamera {

    constructor ( controls,  aspect ) {

        const { 
            fov, 
            near, 
            far, 
            position, 
            radius,
            look,
            isHelperVisible
        } = controls
        super( fov, aspect, near, far )
        
        this.initialPosition = position
        this.position.copy(position)
        this.setLookAt( look.x, look.y, look.z )
        this.createHelper( isHelperVisible )
        this.createSpline( position, radius )

        this.animating = false
    }

    createHelper ( isHelperVisible ) {
        this.helper = new THREE.CameraHelper( this )
        this.setHelperVisibility( isHelperVisible )
    }

    createSpline ( position, radius ) {
        this.spline12 = new THREE.CatmullRomCurve3([
            new THREE.Vector3(position.x, position.y, position.z),
            new THREE.Vector3(radius, position.y, 0),
            new THREE.Vector3(position.x, position.y, -position.z),
        ])

        this.spline21 = new THREE.CatmullRomCurve3([
            new THREE.Vector3(position.x, position.y, -position.z),
            new THREE.Vector3(-radius, position.y, 0),
            new THREE.Vector3(position.x, position.y, position.z),
        ])
    }

    getAnimating () {
        return this.animating
    }

    getHelper () {
        return this.helper
    }

    getLook () {
        return this.look
    }

    nextPlayer() {
        this.animating = true
        const start    = { t: 0 };
        const end      = { t: 1 };

        const spline = ( this.position.z >= 0 ) 
            ? this.spline12     // Player 1
            : this.spline21     // Player 2

        new TWEEN.Tween(start)
                .to(end, 2250)
                .onUpdate( () => {
                    const position = spline.getPointAt( start.t );
                    this.position.copy( position );
                })
                .easing(TWEEN.Easing.Linear.None)
                .onComplete( () => this.animating = false )
                .start()
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
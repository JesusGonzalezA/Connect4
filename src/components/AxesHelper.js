import * as THREE from '/vendor/three.module.js'

class AxesHelper extends THREE.AxesHelper {

    constructor ( controls ) {
        super( controls.size )

        this.setVisible( controls.visible )
    }

    setVisible ( isVisible ) {
        this.visible = isVisible
    }

    setScale ( value ) {
        this.scale.set( value, value, value )
    }
}

export { AxesHelper }
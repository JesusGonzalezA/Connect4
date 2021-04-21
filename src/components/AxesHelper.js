import * as THREE from '../../vendor/three.module.js'

import { scene as sceneControls } from '../controls.js'

class AxesHelper extends THREE.AxesHelper {

    constructor ( ) {
        super( sceneControls.axesHelper.size )

        this.setVisible( sceneControls.axesHelper.visible )
    }

    setVisible ( isVisible ) {
        this.visible = isVisible
    }
}

export { AxesHelper }
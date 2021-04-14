import { TrackballControls } from '../../../vendor/TrackballControls.js'

import { controls } from '../../controls.js'

class CameraControls extends TrackballControls {

    constructor ( camera, rendererDom ) {

        const camControls = controls.camera.cameraControls
        
        super( camera, rendererDom )

        this.rotateSpeed = camControls.rotateSpeed
        this.zoomSpeed   = camControls.zoomSpeed
        this.panSpeed    = camControls.panSpeed
        this.target      = camera.getLook()
    }
}

export { CameraControls }

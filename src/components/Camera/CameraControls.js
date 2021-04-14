import { TrackballControls } from '../../../vendor/TrackballControls.js'

import { camera as camValues } from '../../controls.js'

class CameraControls extends TrackballControls {

    constructor ( camera, rendererDom ) {

        const camControls = camValues.controls
        
        super( camera, rendererDom )

        this.rotateSpeed = camControls.rotateSpeed
        this.zoomSpeed   = camControls.zoomSpeed
        this.panSpeed    = camControls.panSpeed
        this.target      = camera.getLook()
    }
}

export { CameraControls }

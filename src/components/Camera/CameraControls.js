import { TrackballControls } from '../../../vendor/TrackballControls.js'

class CameraControls extends TrackballControls {

    constructor ( controls, camera, rendererDom ) {

        const {
            rotateSpeed,
            zoomSpeed, 
            panSpeed,
            enabled
        } = controls
        
        super( camera, rendererDom )

        this.enabled = enabled
        this.rotateSpeed = rotateSpeed
        this.zoomSpeed   = zoomSpeed
        this.panSpeed    = panSpeed
        this.target      = camera.getLook()
    }
}

export { CameraControls }

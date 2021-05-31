import { GUI as DATGUI } from '../../vendor/dat.gui.module.js'

class GUI extends DATGUI {
    
    constructor ( scene, controls ) {
        super()

        this.controls = controls
        this.scene    = scene
        this.fill()
    }

    fill() {
        this.fillDebug()
    }
    
    fillDebug() {
        
        const scene = this.scene 
        const controls = this.controls 

        const debug = {
            scene, controls,
            axesScale: 1, 
            setDebug: () => this.setDebug( true ),
            deactivateDebug: () => this.setDebug( false ),
            toggleAxes: () => this.setAxesVisibility(),
            toggleLightsHelper: () => this.setLightsHelpersVisibility(),
            toggleCameraHelper: () => this.setCameraHelperVisibility()
        }

        const debugFolder = this.addFolder('Debug')

        debugFolder.add( debug, 'setDebug' ).name('Activar')
        debugFolder.add( debug, 'deactivateDebug' ).name('Desactivar')

        debugFolder
            .add( debug, 'axesScale' )
            .min(1)
            .max(20)
            .step(0.5)
            .name('Tam de los ejes')
            .onFinishChange( () => {
                this.scene.getAxes().setScale(debug.axesScale)
            })

        debugFolder.add( debug, 'toggleAxes').name('Ejes')
        debugFolder.add( debug, 'toggleLightsHelper').name('Luces')
        debugFolder.add( debug, 'toggleCameraHelper').name('Cámara')
    }

    setAxesVisibility ( value ) {
        const axesControls = this.controls.scene.axesHelper
        const axes         = this.scene.getAxes()

        if ( value === undefined ) value = !axesControls.visible
        
        axesControls.visible = value
        axes.setVisible( value )
    }

    setCameraHelperVisibility( value ) {
        const camera         = this.scene.getCamera()
        const cameraControls = this.controls.camera

        if ( value === undefined ) value = !cameraControls.isHelperVisible

        camera.setHelperVisibility( value )
        cameraControls.isHelperVisible = value
    }

    setDebug ( value ) {        
        this.setAxesVisibility( value )
        this.setLightsHelpersVisibility( value )
        this.setCameraHelperVisibility( value )
    }

    setLightsHelpersVisibility( value ) {
        const lightsController = this.scene.getLightsController()
        const lightsControls   = this.controls.lights

        if ( value === undefined ) value = !lightsControls.spotLight.isHelperVisible

        lightsController.setHelpersVisibility( value )
        lightsControls.spotLight.isHelperVisible = value
        lightsControls.spotLight.isShadowHelperVisible = value
    }
}

export { GUI }
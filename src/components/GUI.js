import { GUI as DATGUI } from '../../vendor/dat.gui.module.js'

class GUI extends DATGUI {
    
    constructor ( scene, controls ) {
        super()

        this.controls = controls
        this.scene    = scene
        this.fill()
        this.hide()
    }

    fill() {
        this.fillDebug()
    }
    
    fillDebug() {
        
        const scene = this.scene 
        const controls = this.controls 
        const { position : spotPosition } = controls.lights.spotLight
        const { enabled : controlCamera } = controls.camera.controller

        const debug = {
            scene, spotPosition, controlCamera,
            axesScale: 1, 
            setDebug: () => this.setDebug( true ),
            deactivateDebug: () => this.setDebug( false ),
            toggleAxes: () => this.setAxesVisibility(),
            toggleLightsHelper: () => this.setLightsHelpersVisibility(),
            toggleCameraHelper: () => this.setCameraHelperVisibility()
        }

        const debugFolder = this.addFolder('Debug')

        debugFolder.add( debug, 'controlCamera' )
            .name('Control de la cámara')
            .onChange( () => this.setCameraControls( debug.controlCamera ) )
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
        
        const spotLightFolder = debugFolder.addFolder('SpotLight')
        spotLightFolder.add( debug.spotPosition, 'x')
            .step(1)
            .onChange( () => {
                this.setSpotLightPosition( debug.spotPosition )
            })
        spotLightFolder.add( debug.spotPosition, 'y')
            .step(1)
            .onChange( () => {
                this.setSpotLightPosition( debug.spotPosition )
            })
        spotLightFolder.add( debug.spotPosition, 'z')
            .step(1)
            .onChange( () => {
                this.setSpotLightPosition( debug.spotPosition )
            })
    }

    setAxesVisibility ( value ) {
        const axesControls = this.controls.scene.axesHelper
        const axes         = this.scene.getAxes()

        if ( value === undefined ) value = !axesControls.visible
        
        axesControls.visible = value
        axes.setVisible( value )
    }

    setCameraControls ( value ) {
        const cameraController = this.scene.getCameraControls()
        cameraController.enabled = value
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

    setSpotLightPosition ( value ) {
        const lightsController = this.scene.getLightsController()
        lightsController.setSpotLightPosition( value )
    }
}

export { GUI }
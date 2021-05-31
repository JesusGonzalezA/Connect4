import * as THREE from '../../../vendor/three.module.js'

class LightsController {

    constructor ( controls ) {
        
        this.controls = controls

        this.createLights()
        this.createHelpers()
    }

    createAmbientLight () {
        const { color, intensity } = this.controls.ambientLight

        return new THREE.AmbientLight( color, intensity )  
    }
        
    createHelpers () {
        this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight )
        this.spotLightHelper.visible = this.controls.spotLight.isHelperVisible

        this.spotLightShadowHelper = new THREE.CameraHelper( this.spotLight.shadow.camera )
        this.spotLightShadowHelper.visible = this.controls.spotLight.isShadowHelperVisible

        this.helpers = [ this.spotLightHelper, this.spotLightShadowHelper ]
    }

    createLights () {
        this.ambientLight = this.createAmbientLight()
        this.spotLight    = this.createSpotLight()
        this.lights  = [ this.ambientLight, this.spotLight ]
    }

    createSpotLight () {
        const { color, intensity, position } = this.controls.spotLight

        const spotLight = new THREE.SpotLight( color, intensity )  
        spotLight.position.copy( position )

        //Shadows
        const { mapSize, near, far } = this.controls.spotLight.shadow
        
        spotLight.castShadow = true
        spotLight.shadow.mapSize.width  = mapSize.width
        spotLight.shadow.mapSize.height = mapSize.height
        spotLight.shadow.camera.near = near
        spotLight.shadow.camera.far  = far

        return spotLight
    }

    getHelpers () {
        return this.helpers
    }
    
    getLights () {
        return this.lights
    }

    getSpotLight () {
        return this.spotLight
    }

    getSpotLightHelper () {
        return this.spotLightHelper
    }

    getSpotLightShadowHelper () {
        return this.spotLightShadowHelper
    }
    
    setHelpersVisibility ( value ) {
        this.getHelpers().forEach( (helper) => {
            helper.visible = value
        })
    }

    setSpotLightPosition ( value ) {
        this.spotLight.position.copy( value )
    }

    update () {
        if ( this.spotLightHelper.visible )
            this.spotLightHelper.update()        
        if ( this.spotLightShadowHelper.visible )
            this.spotLightShadowHelper.update()
    }
}

export { LightsController }
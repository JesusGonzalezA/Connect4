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

        this.helpers = [ this.spotLightHelper ]
    }

    createLights () {
        this.ambientLight = this.createAmbientLight()
        this.spotLight    = this.createSpotLight()
        this.lights  = [ this.ambientLight, this.spotLight ]
    }

    createSpotLight () {
        const { color, intensity, position } = this.controls.spotLight

        const spotLight = new THREE.SpotLight( color, intensity )  
        spotLight.castShadow = true
        spotLight.position.copy( position )

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
    
    setHelpersVisibility ( value ) {
        this.spotLightHelper.visible = value
    }

    update () {

        if ( this.spotLightHelper.visible )
            this.spotLightHelper.update()
            
    }
}

export { LightsController }
import * as THREE from '/vendor/three.module.js'

class LightController {

    constructor ( controls ) {
        
        this.controls = controls

        this.createLights()
        this.createHelpers()
    }

    createLights () {
        this.ambientLight = this.createAmbientLight()
        this.spotLight    = this.createSpotLight()
        this.lights  = [ this.ambientLight, this.spotLight ]
    }

    createHelpers () {
        this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight )
        this.spotLightHelper.visible = this.controls.spotLight.isHelperVisible

        this.helpers = [ this.spotLightHelper ]
    }

    createAmbientLight () {
        const { color, intensity } = this.controls.ambientLight

        return new THREE.AmbientLight( color, intensity )  
    }

    createSpotLight () {
        const { color, intensity, position } = this.controls.spotLight

        const spotLight = new THREE.SpotLight( color, intensity )  
        spotLight.position.copy( position )

        return spotLight
    }

    getSpotLight () {
        return this.spotLight
    }

    getSpotLightHelper () {
        return this.spotLightHelper
    }
    
    getLights () {
        return this.lights
    }

    getHelpers () {
        return this.helpers
    }

    update () {
        this.spotLightHelper.visible = this.controls.spotLight.isHelperVisible
        
        if ( this.controls.spotLight.isHelperVisible )
            this.spotLightHelper.update()
    }
}

export { LightController }
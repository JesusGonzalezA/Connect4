import * as THREE from '../../../vendor/three.module.js'

import { lights as lightsControls } from '../../controls.js'

class LightController {

    constructor () {

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
        this.spotLightHelper.visible = lightsControls.spotLight.isHelperVisible

        this.helpers = [ this.spotLightHelper ]
    }

    createAmbientLight () {
        const { color, intensity } = lightsControls.ambientLight

        return new THREE.AmbientLight( color, intensity )  
    }

    createSpotLight () {
        const { color, intensity, position } = lightsControls.spotLight

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
        if ( lightsControls.spotLight.isHelperVisible )
            this.spotLightHelper.update()
    }
}

export { LightController }
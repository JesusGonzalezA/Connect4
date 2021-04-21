import * as THREE from '../../../vendor/three.module.js'

import { lights as lightsControls } from '../../controls.js'

class LightController {

    constructor () {

        const ambientLight = this.createAmbientLight()
        const spotLight    = this.createSpotLight()

        this.lights = [ ambientLight, spotLight ]
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

    getLights () {
        return this.lights
    }
}

export { LightController }
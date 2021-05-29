import * as THREE from '../vendor/three.module.js'

class TextureLoader extends THREE.TextureLoader {

    constructor () {
        super()
    }

}

const textureLoader = new TextureLoader()

export { textureLoader }
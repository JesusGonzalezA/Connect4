import * as THREE from '../../../vendor/three.module.js'

class TextureLoader extends THREE.TextureLoader {

    constructor () {
        super()

        this.instance = this
    }

    #hi () {

    }

    static getInstance () {
        if (!this.instance) this.instance = new TextureLoader()
        return this.instance
    }

}

export { TextureLoader }
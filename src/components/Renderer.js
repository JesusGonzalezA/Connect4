import * as THREE from '../../vendor/three.module.js'

class Renderer extends THREE.WebGLRenderer {

    constructor ( rendererControls, canvasName, width, height ) {
        super();

        this.setClearColor( new THREE.Color( rendererControls.color ) , 1.0 )
        this.setSize( width, height )

        // Shadows
        this.shadowMap.enabled = true 
        this.shadowMap.type    = THREE.PCFSoftShadowMap 

        $(canvasName).append( this.domElement )
    }
    
    getDom () {
        return this.domElement
    }
}

export { Renderer }
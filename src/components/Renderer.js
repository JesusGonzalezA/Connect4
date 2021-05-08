import * as THREE from '../../vendor/three.module.js'

class Renderer extends THREE.WebGLRenderer {

    constructor ( rendererControls, canvasName, width, height ) {
        super();

        this.setClearColor( new THREE.Color( rendererControls.color ) , 1.0 )
        this.setSize( width, height )
        $(canvasName).append( this.domElement )
    }
    
}

export { Renderer }
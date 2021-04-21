import * as THREE from '../../vendor/three.module.js'

import { scene as sceneControls, renderer as rendererControls } from '../controls.js'

class Renderer extends THREE.WebGLRenderer {

    constructor ( width, height ) {
        super();

        this.setClearColor( new THREE.Color( rendererControls.color ) , 1.0 )
        this.setSize( width, height )
        $(sceneControls.canvasName).append( this.domElement )
    }
    
}

export { Renderer }
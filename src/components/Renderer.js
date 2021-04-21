import * as THREE from '../../vendor/three.module.js'

import { renderer as rendererControls } from '../controls.js'

class Renderer extends THREE.WebGLRenderer {

    constructor ( canvas, width, height ) {
        super();

        this.setClearColor( new THREE.Color( rendererControls.color ) , 1.0 )
        this.setSize( width, height )
        $(canvas).append( this.domElement )
    }
    
}

export { Renderer }
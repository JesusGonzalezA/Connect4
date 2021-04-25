import * as THREE from '/vendor/three.module.js'

import { Piece } from "./Piece.js"


class Game extends THREE.Object3D {
    
    constructor ( controls ) {
        super()
        
        const piece = new Piece( controls.piece )
        this.add(piece)
    }

    update () {

    }

}

export { Game }
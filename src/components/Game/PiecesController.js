import { Piece } from "./Piece.js"
import { TextureLoader } from "../../TextureLoader.js"

class PiecesController {

    constructor ( controls ) {
        this.controls = controls
    }

    createPiece () {
        const textureLoader = TextureLoader.getInstance()
        const textures = textureLoader.load('/assets/textures/pieces/matcap_metal.png')
        
        return new Piece(this.controls, textures)
    }
}

export { PiecesController }
import { Piece } from "./Piece.js";
import { TextureLoader } from "../../TextureLoader.js";

class PiecesController {

    constructor ( controls ) {
        this.controls = controls
    }

    createPiece () {
        const textureLoader = new TextureLoader()
        const texture = textureLoader.load('/assets/textures/pieces/matcap_yellow.png')   
        return new Piece(this.controls, texture)
    }
}

export { PiecesController }
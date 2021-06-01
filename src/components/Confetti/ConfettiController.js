
class ConfettiController {

    constructor ( controls ) {        
        this.controls = controls
    }

    fire ( particleRatio, opts ) {
        
        const { defaults, count } = this.controls 

        confetti( 
            Object.assign( {}, defaults, opts, {
                particleCount: Math.floor( count * particleRatio )
            })
        );
    }

    start () {        
        this.controls.fires.forEach( ( elem ) => {
            this.fire( elem.particleRatio, elem.opts )
        })
    }
}

export { ConfettiController }
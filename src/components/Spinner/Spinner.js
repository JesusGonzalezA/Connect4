
class Spinner {

    constructor( controls ) {
        this.element = document.getElementById( controls.id )
    }

    stop () {
        this.element.style.display = "none"
    }

}

export { Spinner } 
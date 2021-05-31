
class Spinner {

    constructor( controls ) {
        this.element = document.getElementById( controls.id )
    }

    stop () {
        document.body.style.backgroundColor = "white"
        this.element.classList.add("hidden")
        this.element.classList.remove("opened")
    }

}

export { Spinner } 
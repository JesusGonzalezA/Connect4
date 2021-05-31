
class Menu {

    constructor ( controls, gameController ) {
        
        const { menuId, buttons } = controls
        this.gameController = gameController
        this.menuDOM = document.getElementById( menuId )
        this.initializeButtons( buttons )
        this.hide()
    }

    hide () {
        this.hidden = true
        this.setDisplay("none")
    }

    initializeButtons ( buttons ) {
        const restartButton = document.getElementById( buttons.restartId )
        restartButton.addEventListener('click', () => this.onRestart() )
    } 

    onRestart () {        
        this.gameController.restart()
    }

    setDisplay ( property ) {
        this.menuDOM.style.display = property
    }

    show () {
        this.hidden = false
        this.setDisplay("block")
    }

    toggleVisibility () {
        ( this.hidden )
            ? this.show()
            : this.hide()    
    }

}

export { Menu }
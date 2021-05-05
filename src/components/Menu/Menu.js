
class Menu {

    constructor ( controls, gameController ) {
        
        const { menuId, buttons } = controls
        this.gameController = gameController
        this.initializeButtons( buttons )
    }

    initializeButtons ( buttons ) {
        const restartButton = document.getElementById(buttons.restartId)
        restartButton.addEventListener('click', () => this.onRestart() )
    } 

    onRestart () {        
        this.gameController.restart()
    }

}

export { Menu }
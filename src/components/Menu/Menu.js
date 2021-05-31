
class Menu {

    constructor ( sceneDOM, controls, gameController ) {
        
        const { menuId, buttons } = controls
        this.gameController = gameController
        
        this.menuDOM  = document.getElementById( menuId )
        this.sceneDOM = sceneDOM 
        this.initializeButtons( buttons )
        this.hidden = true
    }

    hide () {
        this.hidden = true
        this.menuDOM.classList.add("hidden")
        this.sceneDOM.classList.remove("blurred")
        $('html,body').css('cursor', 'grab');
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
        this.menuDOM.classList.remove("hidden")
        this.sceneDOM.classList.add("blurred")
        $('html,body').css('cursor', 'auto');
    }

    toggleVisibility () {
        ( this.hidden )
            ? this.show()
            : this.hide()    
    }

}

export { Menu }
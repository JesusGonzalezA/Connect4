
class Menu {

    constructor ( sceneDOM, controls, gameController ) {
        
        const { 
            menuId, 
            winnerMenuId, 
            winnerId,
            winnerPId,
            tiePId,
            buttons,
         } = controls
        this.gameController = gameController
        
        this.menuDOM   = document.getElementById( menuId )
        this.winnerMenuDOM = document.getElementById( winnerMenuId )
        this.winnerDOM  = document.getElementById( winnerId )
        this.winnerPDOM = document.getElementById( winnerPId )
        this.tiePDOM    = document.getElementById( tiePId )
        this.sceneDOM   = sceneDOM 
        this.initializeButtons( buttons )
        this.hidden = true
    }

    hide () {
        this.hidden = true
        this.winnerMenuDOM.classList.add("hidden")
        this.menuDOM.classList.add("hidden")
        this.sceneDOM.classList.remove("blurred")
        $('html,body').css('cursor', 'grab');
    }

    initializeButtons ( buttons ) {
        const restartButtons = Array.from( document.getElementsByClassName( buttons.restartId ) )
        restartButtons.forEach( button => {
            button.addEventListener('click', () => this.onRestart() )
        })
    } 

    onRestart () {        
        this.gameController.restart()
    }

    setDisplay ( property ) {
        this.menuDOM.style.display = property
    }

    show () {
        this.hidden = false
        this.sceneDOM.classList.add("blurred")
        $('html,body').css('cursor', 'auto');
    }

    showMenu () {
        this.show()
        this.menuDOM.classList.remove("hidden")
    }

    showWinner ( winner ) {
        this.show()

        if ( winner !== null ) {
            
            this.winnerDOM.innerText = winner
            this.winnerPDOM.style.display = "inline-block"
            this.tiePDOM.style.display = "none"
        } else {
            this.winnerPDOM.style.display = "none"
            this.tiePDOM.style.display = "inline-block"
        }

        this.winnerMenuDOM.classList.remove("hidden")
    } 

    toggleVisibilityMenu () {
        ( this.hidden )
            ? this.showMenu()
            : this.hide()    
    }

}

export { Menu }
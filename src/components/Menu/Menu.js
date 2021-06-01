
class Menu {

    constructor ( sceneDOM, controls, gameController ) {
        
        const { 
            menuId, 
            winnerMenuId, 
            winnerId,
            winnerPId,
            tiePId,
            buttons,
            content
         } = controls
        this.controls = controls
        this.gameController = gameController
        
        this.menuDOM   = document.getElementById( menuId )
        this.winnerMenuDOM = document.getElementById( winnerMenuId )
        this.winnerDOM  = document.getElementById( winnerId )
        this.winnerPDOM = document.getElementById( winnerPId )
        this.tiePDOM    = document.getElementById( tiePId )
        this.content    = Array.from(document.getElementsByClassName( content ))
        this.steps      = Array.from(document.getElementsByClassName( "step" ))
        this.maxSteps   = this.content.length
        this.sceneDOM   = sceneDOM 

        this.initializeMenu()
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
        document.getElementById("close").onclick = () => this.hide()
        const restartButtons = Array.from( document.getElementsByClassName( buttons.restartClass ) )
        
        restartButtons.forEach( button => {
            button.addEventListener('click', () => {
                this.onRestart() 
                this.hide()
            })
        })
    } 

    initializeMenu() {
        this.prevBtn = document.getElementById(this.controls.prevButtonId)
        this.nextBtn = document.getElementById(this.controls.nextButtonId)

        this.currentStep = 0
        this.prevBtn.style.display = "none"

        this.content.forEach( (step) => step.style.display = "none")
        this.content[0].style.display = "block"
        this.steps[0].classList.add("active")

        this.prevBtn.addEventListener("click", () => this.prevStep() )
        this.nextBtn.addEventListener("click", () => this.nextStep() )
    }

    onRestart () {        
        this.gameController.restart()
    }

    nextStep () {
        this.content[this.currentStep].style.display = "none"
        this.steps[this.currentStep].classList.remove("active")
        this.currentStep++
        if ( ( this.maxSteps - 1 ) ===  this.currentStep ) {
            this.nextBtn.style.display = "none"
        }
        
        this.steps[this.currentStep].classList.add("active")
        this.content[this.currentStep].style.display = "block"

        this.prevBtn.style.display = "inline-block"
    }

    prevStep () {
        this.content[this.currentStep].style.display = "none"
        this.steps[this.currentStep].classList.remove("active")
        this.currentStep--
        this.content[this.currentStep].style.display = "block"
        this.steps[this.currentStep].classList.add("active")

        if ( this.currentStep === 0 )
            this.prevBtn.style.display = "none"
        this.nextBtn.style.display = "inline-block"
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
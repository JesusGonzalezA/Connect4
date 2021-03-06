import { GameController } from './components/Game/GameController.js'
import { GUI } from './components/GUI.js'
import { Menu } from './components/Menu/Menu.js'
import { getKeyFromEvent, normalizeCoordinates } from './helpers/eventHelper.js'
import * as controls from './controls.js'

import { Scene } from './Scene.js'
import { keys } from './helpers/keys.js'
import { Spinner } from './components/Spinner/Spinner.js'
import { toggleFullScreen } from './helpers/fullscreen.js'

$(function () {
  const spinner  = new Spinner ( controls.spinner )
  const scene    = new Scene( controls ) 
  const gui      = new GUI( scene, controls ) 
  const canvasDOM   = scene.getDom()
  const gameController = new GameController( scene.getGame(), scene.getCamera() )
  const sceneDOM = document.getElementById( controls.scene.id )
  const menu     = new Menu( sceneDOM, controls.menu, gameController )
  
  scene.update()

  // Listeners
    // End
  document.addEventListener( "endGame", (event) => {
    
    scene.startConfetti( )
    menu.showWinner( gameController.getWinner() )
    
  }, false )

    // Loaded
  document.addEventListener( "rendered", ( event ) => {
    spinner.stop()
    menu.showMenu()
    sceneDOM.classList.remove("hidden")    
  }, false )

    // Resize
  window.addEventListener ( "resize", () => scene.onWindowResize() )
    // Add piece from keyboard
  window.addEventListener ( "keydown", (event) => {
    const key =  getKeyFromEvent( event )    

    if ( isNaN( key ) ) 
    {  
      switch( key ) {
        case 'I':
        case 'i':
          menu.toggleVisibilityMenu()
          break;
          
        case keys.CONTROL:
          gameController.cancelMove()
        break;
        case keys.ARROW_RIGHT:
          gameController.moveRight()
          break;
        case keys.ARROW_LEFT:
          gameController.moveLeft()
          break;
        case keys.ENTER:
          if ( document.activeElement === document.body )
            gameController.addPieceAfterMove()
          break;
      }
    }
    else 
      gameController.addPiece( Number(getKeyFromEvent(event)) ) 
  })    

    // Detect piece selection
  canvasDOM.addEventListener ( "pointerdown", (event) => {

    menu.hide()

    const normalizedCoordinates = normalizeCoordinates( event.clientX, event.clientY )
    gameController.selectPiece( normalizedCoordinates.x, normalizedCoordinates.y )
  })
    // Detect piece move
  canvasDOM.addEventListener( "pointermove", (event) => {
    const normalizedCoordinates = normalizeCoordinates( event.clientX, event.clientY )
    gameController.movePiece( normalizedCoordinates.x, normalizedCoordinates.y )
  })
    // Detect stop piece selection
  canvasDOM.addEventListener ( "pointerup", () => {
    gameController.addPieceAfterMove()
  })
    // Detect unselect or add
  canvasDOM.addEventListener("pointerup", () => gameController.endMove() );
  
  // Full screen
  const fullScreenButton = document.getElementById('full-screen')
  fullScreenButton.addEventListener('click', (e) => {
    document.activeElement.blur()
    const fullscreen = toggleFullScreen()

    if ( fullscreen )
      fullScreenButton.innerText = "??????? Volver a pantalla"
    else 
      fullScreenButton.innerText = "??????? Pantalla completa"
    
  })



}) // jquery
    
    
    
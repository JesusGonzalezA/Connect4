import { GameController } from './components/Game/GameController.js'
import { GUI } from './components/GUI.js'
import { Menu } from './components/Menu/Menu.js'
import * as controls from './controls.js'

import { Scene } from './Scene.js'


$(function () {
  const scene = new Scene( controls ) 
  const gameController = new GameController( scene.getGame(), scene.getCamera() )
  const gui   = new GUI( scene, controls ) 
  const menu  = new Menu( controls.menu, gameController )

  window.addEventListener ( "resize", () => scene.onWindowResize() )
  window.addEventListener  ("keydown", (event) => gameController.addPiece( Number(getKeyFromEvent(event)) ) );  
  
  scene.update()  
})

const getKeyFromEvent = ( event ) => {
  return event.key || event.which
} 


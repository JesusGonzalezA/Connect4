import { GUI } from './components/GUI.js'
import * as controls from './controls.js'

import { Scene } from './Scene.js'


$(function () {
  const scene = new Scene( controls ) 
  const gameController = scene.getGameController()
  const gui   = new GUI( scene, controls ) 

  window.addEventListener ( "resize", () => scene.onWindowResize() )

  window.addEventListener  ("keydown", (event) => gameController.addPiece( getKeyFromEvent(event) ) );  
  
  scene.update()  
})

const getKeyFromEvent = ( event ) => {
  return event.key
} 


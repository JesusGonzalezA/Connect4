import { GameController } from './components/Game/GameController.js'
import { GUI } from './components/GUI.js'
import { Menu } from './components/Menu/Menu.js'
import { getKeyFromEvent, normalizeCoordinates } from './helpers/eventHelper.js'
import * as controls from './controls.js'

import { Scene } from './Scene.js'


$(function () {
  const scene = new Scene( controls ) 
  const sceneDom = scene.getDom()
  const gameController = new GameController( scene.getGame(), scene.getCamera() )
  const gui   = new GUI( scene, controls ) 
  const menu  = new Menu( controls.menu, gameController )

  // Listeners
    // Resize
  window.addEventListener ( "resize", () => scene.onWindowResize() )
    // Add piece from keyboard
  window.addEventListener ( "keydown", (event) => {
    gameController.addPiece( Number(getKeyFromEvent(event)) ) 
  });  
    // Detect piece selection
  sceneDom.addEventListener ( "pointerdown", (event) => {
    const normalizedCoordinates = normalizeCoordinates( event.clientX, event.clientY )
    gameController.selectPiece( normalizedCoordinates.x, normalizedCoordinates.y )
  });
    // Detect piece move
  sceneDom.addEventListener( "pointermove", (event) => {
    const normalizedCoordinates = normalizeCoordinates( event.clientX, event.clientY )
    gameController.movePiece( normalizedCoordinates.x, normalizedCoordinates.y )
  })
    // Detect stop piece selection
    sceneDom.addEventListener ( "pointerup", (event) => {
      const normalizedCoordinates = normalizeCoordinates( event.clientX, event.clientY )
      gameController.unSelectPiece( normalizedCoordinates.x, normalizedCoordinates.y )
    });
    // Detect unselect or add
  sceneDom.addEventListener("pointerup", () => gameController.endMove() );
  
  scene.update()  
})




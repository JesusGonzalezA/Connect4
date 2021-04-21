import { GUI } from './components/GUI.js'
import * as controls from './controls.js'

import { Scene } from './Scene.js'


$(function () {
  const scene = new Scene( controls ) 
  const gui   = new GUI( scene, controls ) 

  window.addEventListener ( "resize", () => scene.onWindowResize() )  
  
  scene.update()  
})  
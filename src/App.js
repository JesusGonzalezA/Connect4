import * as controls from './controls.js'

import { Scene } from './Scene.js'


$(function () {
  const scene = new Scene( controls )  

  window.addEventListener ( "resize", () => scene.onWindowResize() )  
  
  scene.update()  
})  
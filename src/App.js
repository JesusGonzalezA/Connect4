import { Scene } from './Scene.js'

$(function () {
  const scene = new Scene("#WebGL-output")  

  window.addEventListener ( "resize", () => scene.onWindowResize() )  
  
  scene.update()  
})  
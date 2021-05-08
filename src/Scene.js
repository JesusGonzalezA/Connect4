import * as THREE from '../vendor/three.module.js'

import { AxesHelper } from './components/AxesHelper.js'
import { Camera } from './components/Camera/Camera.js'  
import { CameraControls } from './components/Camera/CameraControls.js'
import { Game } from './components/Game/Game.js'
import { LightsController } from './components/Lights/LigthsController.js'
import { Renderer } from './components/Renderer.js'
 
class Scene extends THREE.Scene {

  constructor ( controls ) { 
    
    super()  

    this.createRenderer( controls.scene.canvasName, controls.renderer )  
    this.createLights( controls.lights )  
    this.createCamera( controls.camera )  
    this.createAxes( controls.scene.axesHelper )

    this.createGame( controls.game )

    this.objectsToUpdate = [
      this.getLightsController(),
      this.getGame(),
      this.getCameraControls()
    ]
  }

  createGame ( controls ) {
    this.game = new Game( controls )
    this.add( this.game )
  }

  createAxes ( controls ) {
    this.axes = new AxesHelper( controls )
    this.add( this.axes )  
  }

  createCamera ( controls ) {
    const aspect = window.innerWidth / window.innerHeight 

    this.camera = new Camera( controls, aspect )
    this.cameraControl = new CameraControls(
        controls.controller,
        this.camera,
        this.renderer.domElement
    )

    this.add( this.camera.getHelper() )
  }
  
  createLights ( controls ) {
    this.lightsController = new LightsController( controls )
    const lights  = this.lightsController.getLights()
    const helpers = this.lightsController.getHelpers()
    
    this.add ( ...lights, ...helpers )
  }
  
  createRenderer ( canvasName, controls ) {
    this.renderer = new Renderer(
      controls, 
      canvasName,
      window.innerWidth, 
      window.innerHeight 
    )
  }
  
  getCamera () {
    return this.camera  
  }

  getCameraControls () {
    return this.cameraControl
  }

  getAxes () {
    return this.axes;
  }

  getLightsController () {
    return this.lightsController
  }

  getGame () {
    return this.game
  }

  getGameController() {
    return this.gameController
  }
  
  setCameraAspect ( ratio ) {
    this.camera.setCameraAspect( ratio )
  }
    
  onWindowResize () {
    const width = window.innerWidth
    const height = window.innerHeight

    this.setCameraAspect( width / height )  
    this.renderer.setSize( width, height )  
  }

  update () {
    this.renderer.render ( this, this.getCamera() )  
    
    for ( const object of this.objectsToUpdate )
      object.update()

    requestAnimationFrame( () => this.update() )  
  }
}

export { Scene }
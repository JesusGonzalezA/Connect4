import * as THREE from '../vendor/three.module.js'
import * as TWEEN from '../vendor/tween.esm.js'

import { AxesHelper } from './components/AxesHelper.js'
import { Camera } from './components/Camera/Camera.js'  
import { CameraControls } from './components/Camera/CameraControls.js'
import { ConfettiController } from './components/Confetti/ConfettiController.js'
import { Table } from './components/Environment/Table.js'
import { Game } from './components/Game/Game.js'
import { LightsController } from './components/Lights/LigthsController.js'
import { Renderer } from './components/Renderer.js'
 
class Scene extends THREE.Scene {

  constructor ( controls ) { 
    
    super()  

    this.controls = controls    

    this.createBackground( controls.scene )
    this.createConfettiController( controls.confetti )
    this.createRenderer( controls.scene.canvasName, controls.renderer )  
    this.createLights( controls.lights )  
    this.createCamera( controls.camera )  
    this.createAxes( controls.scene.axesHelper )
    this.createTable( controls.table )

    this.createGame( controls.game, this.camera )

    this.objectsToUpdate = [
      this.getLightsController(),
      this.getGame(),
      this.getCameraControls()
    ]

    this.onLoadedEvent = new Event( this.controls.renderer.eventOnLoaded )
  }

  createAxes ( controls ) {
    this.axes = new AxesHelper( controls )
    this.add( this.axes )  
  }

  createBackground( { urlTextures, extension }) {
    const manager = new THREE.LoadingManager()
    manager.onLoad = () => {
      if ( this.loaded )
        document.dispatchEvent( this.onLoadedEvent )
      this.imagesLoaded = true
    }

    this.background = new THREE.CubeTextureLoader( manager )
      .setPath( urlTextures )
      .load( [
        'px.' + extension,
        'nx.' + extension,
        'py.' + extension,
        'ny.' + extension,
        'pz.' + extension,
        'nz.' + extension
      ] )
      
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

  createConfettiController( controls ) {
    this.confettiController = new ConfettiController( controls )
  }

  createGame ( controls, camera ) {
    this.game = new Game( controls, camera )
    this.add( this.game )
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

  createTable ( controls ) {
    this.table = new Table( controls )
    this.add( this.table )
  }
  
  getAxes () {
    return this.axes;
  }

  getCamera () {
    return this.camera  
  }

  getCameraControls () {
    return this.cameraControl
  }

  getDom () {
    return this.renderer.getDom()
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
  
  onWindowResize () {
    const width = window.innerWidth
    const height = window.innerHeight

    this.setCameraAspect( width / height )  
    this.renderer.setSize( width, height )  
  }

  setCameraAspect ( ratio ) {
    this.camera.setCameraAspect( ratio )
  }

  startConfetti ( winner ) {
    this.confettiController.start( winner )
  }
  
  update () {
    this.renderer.render ( this, this.getCamera() )  
    if ( this.loaded === undefined && this.imagesLoaded )
      document.dispatchEvent( this.onLoadedEvent )
    this.loaded = true
   
    TWEEN.update()

    for ( const object of this.objectsToUpdate )
      object.update()

    requestAnimationFrame( () => this.update() )  
  }
}

export { Scene }
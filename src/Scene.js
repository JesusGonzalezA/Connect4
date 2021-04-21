import * as THREE from '../vendor/three.module.js'

import { AxesHelper } from './components/AxesHelper.js'
import { Camera } from './components/Camera/Camera.js'  
import { CameraControls } from './components/Camera/CameraControls.js'
import { LightController } from './components/Lights/LigthController.js'
import { Renderer } from './components/Renderer.js'

 
class Scene extends THREE.Scene {

  constructor ( controls ) { 
    
    super()  

    this.createRenderer( controls.scene.canvasName, controls.renderer )  
    this.createLights( controls.lights )  
    this.createCamera( controls.camera )  
    this.createAxes( controls.scene.axesHelper )
  }

  createAxes ( controls ) {
    const axes = new AxesHelper( controls )
    this.add(axes)  
  }

  createCamera ( controls ) {
    const aspect = window.innerWidth / window.innerHeight 

    this.camera = new Camera( controls, aspect )
    this.cameraControl = new CameraControls(
        controls.controller,
        this.camera,
        this.renderer.domElement
    )
  }
  
  createLights ( controls ) {
    this.lightsController = new LightController( controls )
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
    this.cameraControl.update()
    this.lightsController.update()  

    requestAnimationFrame( () => this.update() )  
  }
}

export { Scene }
import * as THREE from '../vendor/three.module.js'
import { AxesHelper } from './components/AxesHelper.js'

import { Camera } from './components/Camera/Camera.js'  
import { CameraControls } from './components/Camera/CameraControls.js'  
import { LightController } from './components/Lights/LigthController.js'
import { Renderer } from './components/Renderer.js'

 
class Scene extends THREE.Scene {

  constructor () { 
    
    super()  
    
    this.createRenderer()  
    this.createLights()  
    this.createCamera()  
    this.createAxes()
  }
  
  createAxes () {
    const axes = new AxesHelper()
    this.add(axes)  
  }

  createCamera () {
    this.camera = new Camera( window.innerWidth / window.innerHeight )
    this.cameraControl = new CameraControls(
        this.camera,
        this.renderer.domElement
    )
  }
  
  createLights () {
    this.lightsController = new LightController()
    const lights  = this.lightsController.getLights()
    const helpers = this.lightsController.getHelpers()
    
    this.add ( ...lights, ...helpers )
  }
  
  createRenderer () {
    this.renderer = new Renderer(
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
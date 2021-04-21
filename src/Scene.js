import * as THREE from '../vendor/three.module.js'

import { Camera } from './components/Camera/Camera.js'  
import { CameraControls } from './components/Camera/CameraControls.js'  
import { LightController } from './components/Lights/LigthController.js'
import { Renderer } from './components/Renderer.js'

 
class Scene extends THREE.Scene {

  constructor ( myCanvas ) { 
    
    super()  
    
    this.createRenderer( myCanvas )  
    this.createLights()  
    this.createCamera()  
    this.createAxes( 1 )
  }
  
  createAxes ( size ) {
    const axes = new THREE.AxesHelper( size )  
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
    const lightsController = new LightController()
    const lights = lightsController.getLights()
    
    this.add ( ...lights )
  }
  
  createRenderer ( myCanvas ) {
    this.renderer = new Renderer( 
      myCanvas, 
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

    requestAnimationFrame( () => this.update() )  
  }
}

export { Scene }
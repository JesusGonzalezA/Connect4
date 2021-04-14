import * as THREE from '../vendor/three.module.js'
import { GUI } from '../vendor/dat.gui.module.js'

import { Camera } from './components/Camera/Camera.js';
import { CameraControls } from './components/Camera/CameraControls.js';

 
class Scene extends THREE.Scene {

  constructor (myCanvas) { 
    
    super();
    
    this.renderer = this.createRenderer(myCanvas);

    this.createLights();
    this.createCamera();
    this.createAxes(1);
  }
  
  createAxes ( size ) {
    const axes = new THREE.AxesHelper( size );
    this.add(axes);
  }

  createCamera () {
    this.camera = new Camera( window.innerWidth / window.innerHeight )
    this.cameraControl = new CameraControls(
        this.camera,
        this.renderer.domElement
    )
  }
  
  createLights () {
    const ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.spotLight = new THREE.SpotLight( 
      0xffffff, 
      0.5
    );
    
    this.spotLight.position.set( 60, 60, 40 );
    this.add (ambientLight);
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xAAAAAAA), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    this.camera.setCameraAspect(ratio)
  }
    
  onWindowResize () {
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    this.renderer.render (this, this.getCamera());
    this.cameraControl.update();   

    requestAnimationFrame(() => this.update())
  }
}

export { Scene }
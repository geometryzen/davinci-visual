/// <reference path="../../typings/createjs/createjs.d.ts"/>
/// <reference path="Workbench2D.ts"/>
/// <reference path="Workbench3D.ts"/>
module visual
{
  export class Visual
  {
    public scene: THREE.Scene = new THREE.Scene();
    public camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 10000);
    public renderer: THREE.WebGLRenderer;
    public workbench3D: Workbench3D;
    public canvas2D: HTMLCanvasElement;
    public workbench2D: Workbench2D;
    public stage: createjs.Stage;

    constructor(wnd: Window, canvas?: HTMLCanvasElement)
    {
      var ambientLight = new THREE.AmbientLight(0x111111);
      this.scene.add(ambientLight);

      var pointLight = new THREE.PointLight(0xFFFFFF);
      pointLight.position.set(10.0, 10.0, 10.0);
      this.scene.add(pointLight);

      var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
      directionalLight.position.set(0.0, 1.0, 0.0);
      this.scene.add(directionalLight);

      this.camera.position.set(4.0, 4.0, 4.0);
      this.camera.up.set(0,0,1);
      this.camera.lookAt(this.scene.position);

      if (canvas)
      {
        this.renderer = new THREE.WebGLRenderer({canvas:canvas});
        this.workbench3D = new Workbench3D(canvas, this.renderer, this.camera, wnd);
      }
      else
      {
        this.renderer = new THREE.WebGLRenderer();
        this.workbench3D = new Workbench3D(this.renderer.domElement, this.renderer, this.camera, wnd);
      }
      this.renderer.setClearColor(new THREE.Color(0x080808), 1.0)
      
      this.canvas2D = wnd.document.createElement("canvas");

      this.canvas2D.style.position = "absolute";
      this.canvas2D.style.top = "0px";
      this.canvas2D.style.left = "0px";
      
      this.workbench2D = new Workbench2D(this.canvas2D, wnd);
      if (typeof createjs !== 'undefined') {
        this.stage = new createjs.Stage(this.canvas2D);
        this.stage.autoClear = true;
      }
    }

    add(object: THREE.Object3D)
    {
      this.scene.add(object);
    }

    /**
     * Resizes the canvas to (width, height), and also sets the viewport to fit that size.
     */
    setSize(width: number, height: number)
    {
      this.workbench3D.setSize(width, height);
      this.workbench2D.setSize(width, height);
    }

    setUp()
    {
      this.workbench3D.setUp();
      this.workbench2D.setUp();
    }

    tearDown()
    {
      this.workbench3D.tearDown();
      this.workbench2D.tearDown();
    }

    /**
     * Render the 3D scene using the camera.
     */
    update()
    {
      this.renderer.render(this.scene, this.camera);
      if (this.stage)
      {
        this.stage.update();
      }
    }
  }
}
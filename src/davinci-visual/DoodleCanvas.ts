/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="../../typings/createjs/createjs.d.ts"/>
/// <reference path="Workbench2D.ts"/>
/// <reference path="Workbench3D.ts"/>
module visual
{
  /**
   * An convenient abstraction for doodles consisting of a THREE.Scene, THREE.PerspeciveCamera and THREE.WebGLRenderer.
   * The camera is set looking along the y-axis so that the x-axis is to the right and the z-axis is up.
   * The camera field of view is initialized to 45 degrees.
   * When used for a canvas over the entire window, the `setUp` and `tearDown` methods provide `resize` handling.
   * When used for a smaller canvas, the width and height properties control the canvas size.
   * This convenience class does not provide lighting of the scene. 
   */
  export class DoodleCanvas/* implements HTMLCanvasElement*/
  {
    public scene: THREE.Scene = new THREE.Scene();
    public camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 10000);
    public renderer: THREE.WebGLRenderer;
    public workbench3D: Workbench3D;
    public canvas3D: HTMLCanvasElement;
    public canvas2D: HTMLCanvasElement;
    public workbench2D: Workbench2D;
    public stage: createjs.Stage;

    // FIXME: We'll need TypeScript 1.4+ to be able to use union types for canvas.
    /**
     * Constructs a `DoodleCanvas` associated with the specified window and canvas.
     * @param $window The window in which the visualization will operate.
     * @param canvas The canvas element (HTMLCanvasElement) or the `id` (string) property of a canvas element in which the visualization will operate.
     */
    constructor($window: Window, canvas?: any)
    {
      // We assume the `physical` convention that x is to the right, z is up, and y is away from the camera.
      this.camera.position.set(0, -5, 0);
      this.camera.up.set(0, 0, 1);
      this.camera.lookAt(this.scene.position);

      if (typeof canvas === 'string')
      {
        this.canvas3D = <HTMLCanvasElement>document.getElementById(canvas);
        if (this.canvas3D) {
          this.renderer = new THREE.WebGLRenderer({canvas:this.canvas3D});
        }
        else {
          throw new Error(canvas + " is not a valid canvas element identifier.");
        }
      }
      else if (typeof canvas === 'object')
      {
        this.canvas3D = canvas;
        this.renderer = new THREE.WebGLRenderer({canvas:canvas});
      }
      else
      {
        this.renderer = new THREE.WebGLRenderer();
        this.canvas3D = this.renderer.domElement;
      }
      this.workbench3D = new Workbench3D(this.canvas3D, this.renderer, this.camera, $window);

      this.canvas2D = $window.document.createElement("canvas");

      this.canvas2D.style.position = "absolute";
      this.canvas2D.style.top = "0px";
      this.canvas2D.style.left = "0px";
      
      this.workbench2D = new Workbench2D(this.canvas2D, $window);
      if (typeof createjs !== 'undefined') {
        this.stage = new createjs.Stage(this.canvas2D);
        this.stage.autoClear = true;
      }
    }

    /**
     * The `width` property of the doodle canvas.
     */
    get width() {
      return this.canvas3D.width;
    }

    /**
     * The `width` property of the doodle canvas.
     */
    set width(width: number) {
      this.canvas3D.width = width;
      this.canvas2D.width = width;
      this.workbench3D.setSize(width, this.canvas3D.height);
      this.workbench2D.setSize(width, this.canvas3D.height);
    }

    /**
     * The `height` property of the doodle canvas.
     */
    get height() {
      return this.canvas3D.height;
    }

    /**
     * The `height` property of the doodle canvas.
     */
    set height(height: number) {
      this.canvas3D.height = height;
      this.canvas2D.height = height;
      this.workbench3D.setSize(this.canvas3D.width, height);
      this.workbench2D.setSize(this.canvas3D.width, height);
    }

    /**
     * Adds an object, typically a THREE.Mesh or THREE.Camera to the underlying THREE.Scene.
     */
    add(object: THREE.Object3D)
    {
      return this.scene.add(object);
    }

    /**
     * Removes an object, typically a THREE.Mesh or THREE.Camera from the underlying THREE.Scene.
     */
    remove(object: THREE.Object3D)
    {
      return this.scene.remove(object);
    }

    /**
     * Resizes the canvas to (width, height), and also sets the viewport to fit that size.
     */
    setSize(width: number, height: number)
    {
      this.workbench3D.setSize(width, height);
      this.workbench2D.setSize(width, height);
    }

    /**
     * Performs one-time setup of the doodle canvas when being used to support full window.
     */
    setUp()
    {
      this.workbench3D.setUp();
      this.workbench2D.setUp();
    }

    /**
     * Performs one-time teardown of the doodle canvas when being used to support full window.
     */
    tearDown()
    {
      this.workbench3D.tearDown();
      this.workbench2D.tearDown();
    }

    /**
     * Render the 3D scene using the default camera.
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
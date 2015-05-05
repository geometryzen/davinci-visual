module visual
{
  function removeElementsByTagName(doc: Document, tagName: string)
  {
    var elements = doc.getElementsByTagName(tagName);
    for (var i = elements.length - 1; i >= 0; i--)
    {
      var e = elements[i];
      e.parentNode.removeChild(e);
    }
  }

  /**
   *
   */
  export class Workbench3D
  {
    public canvas: HTMLCanvasElement;
    public renderer: THREE.WebGLRenderer;
    public camera: THREE.PerspectiveCamera;
    public $window: Window;
    public embedCanvas: boolean;
    private originalWidth: number;
    private originalHeight: number;
    private resizeHandler: EventListener;
    constructor(canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, $window: Window, embedCanvas: boolean)
    {
      this.canvas = canvas;
      this.renderer = renderer;
      this.camera = camera;
      this.$window = $window;
      this.embedCanvas = embedCanvas;

      var self = this;

      function onWindowResize(event)
      {
        var width  = $window.innerWidth;
        var height = $window.innerHeight;
        self.setSize(width, height);
      }
      this.resizeHandler = onWindowResize;
    }

    setSize(width: number, height: number)
    {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    /**
     * The `setUp` method causes the Workbench3D to start handling window resize events for the canvas.
     * The canvas is inserted as the first element in the document body if requested with `embedCanvas`.
     */
    setUp()
    {
      this.originalWidth  = this.canvas.width;
      this.originalHeight = this.canvas.height;

      if (this.embedCanvas) {
        this.$window.document.body.insertBefore(this.canvas, this.$window.document.body.firstChild);
      }

      this.$window.addEventListener('resize', this.resizeHandler, false);
      this.setSize(this.$window.innerWidth, this.$window.innerHeight);
    }

    /**
     * The `tearDown` method causes the Workbench3D to stop handling window resize events for the canvas.
     * The canvas is removed from its parent if it was originally inserted by the workbench.
     * The canvas is restored to its original dimensions.
     */
    tearDown()
    {
      this.$window.removeEventListener('resize', this.resizeHandler, false);

      if (this.embedCanvas) {
        this.canvas.parentNode.removeChild(this.canvas);
      }

      this.canvas.width  = this.originalWidth;
      this.canvas.height = this.originalHeight;
    }
  }
}
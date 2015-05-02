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

  export class Workbench3D
  {
    public canvas: HTMLCanvasElement;
    public renderer: THREE.WebGLRenderer;
    public camera: THREE.PerspectiveCamera;
    public wnd: Window;
    private sizer: EventListener;
    constructor(canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, wnd: Window)
    {
      this.canvas = canvas;
      this.renderer = renderer;
      this.camera = camera;
      this.wnd = wnd;

      var self = this;

      function onWindowResize(event)
      {
        var width  = wnd.innerWidth;
        var height = wnd.innerHeight;
        self.setSize(width, height);
      }
      this.sizer = onWindowResize;
    }

    setSize(width: number, height: number)
    {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    setUp()
    {
      this.wnd.document.body.insertBefore(this.canvas, this.wnd.document.body.firstChild);
      this.wnd.addEventListener('resize', this.sizer, false);
      this.sizer(null);

    }

    tearDown()
    {
      this.wnd.removeEventListener('resize', this.sizer, false);
      removeElementsByTagName(this.wnd.document, "canvas");
    }
  }
}
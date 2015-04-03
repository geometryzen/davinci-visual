declare class Workbench3D {
    canvas: HTMLCanvasElement;
    wnd: Window;
    private sizer;
    constructor(canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, controls: any, wnd: Window);
    setUp(): void;
    tearDown(): void;
}
export = Workbench3D;

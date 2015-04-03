declare class Workbench2D {
    canvas: HTMLCanvasElement;
    wnd: Window;
    private sizer;
    constructor(canvas: HTMLCanvasElement, wnd: Window);
    setUp(): void;
    tearDown(): void;
}
export = Workbench2D;

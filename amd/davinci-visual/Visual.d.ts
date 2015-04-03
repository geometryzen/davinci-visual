/// <reference path="../../typings/createjs/createjs.d.ts" />
import Workbench2D = require('davinci-visual/Workbench2D');
import Workbench3D = require('davinci-visual/Workbench3D');
declare class Visual {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    workbench3D: Workbench3D;
    canvas2D: HTMLCanvasElement;
    workbench2D: Workbench2D;
    stage: createjs.Stage;
    controls: any;
    constructor(wnd: Window);
    add(object: THREE.Object3D): void;
    setUp(): void;
    tearDown(): void;
    update(): void;
}
export = Visual;

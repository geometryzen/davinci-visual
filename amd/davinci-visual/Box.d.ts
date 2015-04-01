/// <reference path="../../typings/threejs/three.d.ts" />
import VisualElement = require('davinci-visual/VisualElement');
declare class Box extends VisualElement<THREE.BoxGeometry> {
    constructor(width: number, height: number, depth: number, color: number, opacity?: number, transparent?: boolean);
}
export = Box;

/// <reference path="../../typings/threejs/three.d.ts" />
import VisualElement = require('davinci-visual/VisualElement');
declare class Sphere extends VisualElement<THREE.SphereGeometry> {
    constructor(radius: number, color: number, opacity?: number, transparent?: boolean);
}
export = Sphere;

/// <reference path="../../typings/threejs/three.d.ts" />
import SphereOptions = require('davinci-visual/SphereOptions');
import VisualElement = require('davinci-visual/VisualElement');
declare class Sphere extends VisualElement<THREE.SphereGeometry> {
    constructor(options: SphereOptions, color: number, opacity?: number, transparent?: boolean);
}
export = Sphere;

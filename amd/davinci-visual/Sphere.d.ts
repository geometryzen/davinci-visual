/// <reference path="../../typings/threejs/three.d.ts" />
import SphereOptions = require('davinci-visual/SphereOptions');
import LambertMaterialParameters = require('davinci-visual/LambertMaterialParameters');
import VisualElement = require('davinci-visual/VisualElement');
declare class Sphere extends VisualElement<THREE.SphereGeometry> {
    constructor(options: SphereOptions, m: LambertMaterialParameters);
}
export = Sphere;

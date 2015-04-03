/// <reference path="../../typings/threejs/three.d.ts" />
import SphereGeometryParameters = require('davinci-visual/SphereGeometryParameters');
import LambertMaterialParameters = require('davinci-visual/LambertMaterialParameters');
import VisualElement = require('davinci-visual/VisualElement');
declare class Sphere extends VisualElement<THREE.SphereGeometry> {
    constructor(g?: SphereGeometryParameters, m?: LambertMaterialParameters);
}
export = Sphere;

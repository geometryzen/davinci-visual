///<reference path="../../typings/threejs/three.d.ts"/>
import SphereGeometryParameters = require('davinci-visual/SphereGeometryParameters');
import LambertMaterialParameters = require('davinci-visual/LambertMaterialParameters');
import VisualElement = require('davinci-visual/VisualElement');

class Sphere extends VisualElement<THREE.SphereGeometry>
{
  constructor(g?: SphereGeometryParameters, m?: LambertMaterialParameters)
  {
    g = g || {};
    g.radius = g.radius || 1.0;
    g.widthSegments = g.widthSegments || 16;
    g.heightSegments = g.heightSegments || 12;
    m = m || {};
    m.color = m.color || 0xFFFFFF;
    super(new THREE.SphereGeometry(g.radius, g.widthSegments, g.heightSegments, g.phiStart, g.phiLength, g.thetaStart, g.thetaLength), m.color, m.opacity, m.transparent);
  }
}

export = Sphere;

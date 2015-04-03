///<reference path="../../typings/threejs/three.d.ts"/>
import SphereGeometryParameters = require('davinci-visual/SphereGeometryParameters');
import LambertMaterialParameters = require('davinci-visual/LambertMaterialParameters');
import VisualElement = require('davinci-visual/VisualElement');

class Sphere extends VisualElement<THREE.SphereGeometry>
{
  constructor(g?: SphereGeometryParameters, m?: LambertMaterialParameters)
  {
    super(new THREE.SphereGeometry(g.radius, g.widthSegments, g.heightSegments), m.color, m.opacity, m.transparent);
  }
}

export = Sphere;

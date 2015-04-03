///<reference path="../../typings/threejs/three.d.ts"/>
import SphereOptions = require('davinci-visual/SphereOptions');
import LambertMaterialParameters = require('davinci-visual/LambertMaterialParameters');
import VisualElement = require('davinci-visual/VisualElement');

class Sphere extends VisualElement<THREE.SphereGeometry>
{
  constructor(options: SphereOptions, m: LambertMaterialParameters)
  {
    super(new THREE.SphereGeometry(options.radius, options.widthSegments, options.heightSegments), m.color, m.opacity, m.transparent);
  }
}

export = Sphere;

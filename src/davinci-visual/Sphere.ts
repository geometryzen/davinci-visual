///<reference path="../../typings/threejs/three.d.ts"/>
import SphereOptions = require('davinci-visual/SphereOptions');
import VisualElement = require('davinci-visual/VisualElement');

class Sphere extends VisualElement<THREE.SphereGeometry>
{
  constructor(options: SphereOptions, color: number, opacity: number = 1.0, transparent: boolean = false)
  {
    super(new THREE.SphereGeometry(options.radius, options.widthSegments, options.heightSegments), color, opacity, transparent);
  }
}

export = Sphere;

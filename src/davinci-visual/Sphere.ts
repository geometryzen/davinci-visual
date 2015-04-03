///<reference path="../../typings/threejs/three.d.ts"/>
import VisualElement = require('davinci-visual/VisualElement');

class Sphere extends VisualElement<THREE.SphereGeometry>
{
  constructor(radius: number, color: number, opacity: number = 1.0, transparent: boolean = false)
  {
    super(new THREE.SphereGeometry(radius), color, opacity, transparent);
  }
}

export = Sphere;

///<reference path="../../typings/threejs/three.d.ts"/>
import VisualElement = require('davinci-visual/VisualElement');

class Box extends VisualElement<THREE.BoxGeometry>
{
  constructor(width: number, height: number, depth: number, color: number, opacity: number = 1.0, transparent: boolean = false)
  {
    super(new THREE.BoxGeometry(width, height, depth), color, opacity, transparent);
  }
}

export = Box;

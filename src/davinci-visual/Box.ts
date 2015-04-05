/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
  export class Box extends VisualElement<THREE.BoxGeometry>
  {
    constructor(width: number, height: number, depth: number, color: number, opacity: number = 1.0, transparent: boolean = false)
    {
      super(new THREE.BoxGeometry(width, height, depth), color, opacity, transparent);
    }
  }
}

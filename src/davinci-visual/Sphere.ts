/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
    export class Sphere extends VisualElement<THREE.SphereGeometry> {
        constructor(parameters?: {radius?: number; color?: number; opacity?: number; transparent?: boolean}) {
            parameters = parameters || {};
            parameters.radius = parameters.radius || 1.0;
            parameters.color = typeof parameters.color === 'number' ? parameters.color : 0xFFFFFF;
            parameters.opacity = typeof parameters.opacity === 'number' ? parameters.opacity : 1.0;
            parameters.transparent = typeof parameters.transparent === 'boolean' ? parameters.transparent : false;
            super(new THREE.SphereGeometry(parameters.radius, 16, 12), parameters.color, parameters.opacity, parameters.transparent);
      }
    }
}

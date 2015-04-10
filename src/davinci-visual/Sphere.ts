/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="Mesh.ts"/>
module visual {
    export class Sphere extends Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial> {
        constructor(parameters?: {radius?: number; color?: number; opacity?: number; transparent?: boolean}) {
            parameters = parameters || {};
            parameters.radius = parameters.radius || 1.0;
            parameters.color = typeof parameters.color === 'number' ? parameters.color : 0xFFFFFF;
            parameters.opacity = typeof parameters.opacity === 'number' ? parameters.opacity : 1.0;
            parameters.transparent = typeof parameters.transparent === 'boolean' ? parameters.transparent : false;
            var material = new THREE.MeshLambertMaterial({color: parameters.color, opacity: parameters.opacity, transparent: parameters.transparent});
            super(new THREE.SphereGeometry(parameters.radius, 16, 12), material);
      }
    }
}

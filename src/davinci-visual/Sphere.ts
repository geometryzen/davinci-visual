/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="Mesh.ts"/>
module visual {
    /**
     * A class for generating a THREE.SphereGeometry with THREE.MeshLambertMaterial.
     * The default arguments create a unity radius sphere which is blue and opaque.
     */
    export class Sphere extends Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial> {
        constructor(parameters?: {radius?: number; widthSegments?: number; heightSegments?: number; phiStart?: number; phiLength?: number; thetaStart?: number; thetaLength?: number; color?: number; opacity?: number; transparent?: boolean}) {
            parameters = parameters || {};
            parameters.radius = parameters.radius || 1.0;
            parameters.widthSegments = parameters.widthSegments || 24;
            parameters.heightSegments = parameters.heightSegments || 18;
            parameters.color = typeof parameters.color === 'number' ? parameters.color : 0x0000FF;
            parameters.opacity = typeof parameters.opacity === 'number' ? parameters.opacity : 1.0;
            parameters.transparent = typeof parameters.transparent === 'boolean' ? parameters.transparent : false;
            var material = new THREE.MeshLambertMaterial({color: parameters.color, opacity: parameters.opacity, transparent: parameters.transparent});
            super(new THREE.SphereGeometry(parameters.radius, parameters.widthSegments, parameters.heightSegments, parameters.phiStart, parameters.phiLength, parameters.thetaStart, parameters.thetaLength), material);
      }
    }
}

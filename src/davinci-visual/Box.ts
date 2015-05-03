/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="Mesh.ts"/>
module visual {
    /**
     * A class for generating a THREE.BoxGeometry with THREE.MeshLambertMaterial.
     * The default arguments create a unit cube which is red and opaque.
     */
    export class Box extends Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial> {
        constructor(parameters?: {width?: number; height?: number; depth?: number; color?: number; opacity?: number; transparent?: boolean}) {
            parameters = parameters || {};
            parameters.width = parameters.width || 1.0;
            parameters.height = parameters.height || 1.0;
            parameters.depth = parameters.depth || 1.0;
            parameters.color = typeof parameters.color === 'number' ? parameters.color : 0xFF0000;
            parameters.opacity = typeof parameters.opacity === 'number' ? parameters.opacity : 1.0;
            parameters.transparent = typeof parameters.transparent === 'boolean' ? parameters.transparent : false;
            var material = new THREE.MeshLambertMaterial({color: parameters.color, opacity: parameters.opacity, transparent: parameters.transparent});
            super(new THREE.BoxGeometry(parameters.width, parameters.height, parameters.depth), material);
        }
    }
}

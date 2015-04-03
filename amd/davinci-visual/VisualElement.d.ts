/// <reference path="../../typings/threejs/three.d.ts" />
/**
 * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
 */
declare class VisualElement<T extends THREE.Geometry> extends THREE.Mesh {
    geometry: T;
    material: THREE.MeshLambertMaterial;
    constructor(geometry: T, color: number, opacity?: number, transparent?: boolean);
}
export = VisualElement;

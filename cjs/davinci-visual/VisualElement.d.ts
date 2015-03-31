/// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts" />
/// <reference path="../../typings/threejs/three.d.ts" />
/**
 * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
 */
declare class VisualElement<T extends THREE.Geometry> {
    geometry: T;
    material: THREE.MeshLambertMaterial;
    mesh: THREE.Mesh;
    constructor(geometry: T, color: number, opacity?: number, transparent?: boolean);
    position: blade.Euclidean3;
    attitude: blade.Euclidean3;
    scale: THREE.Vector3;
    color: THREE.Color;
}
export = VisualElement;

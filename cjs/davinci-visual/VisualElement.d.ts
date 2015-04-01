/// <reference path="../../typings/threejs/three.d.ts" />
/**
 * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
 */
declare class VisualElement<T extends THREE.Geometry> {
    geometry: T;
    material: THREE.MeshLambertMaterial;
    mesh: THREE.Mesh;
    constructor(geometry: T, color: number, opacity?: number, transparent?: boolean);
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
    scale: THREE.Vector3;
    opacity: number;
    color: THREE.Color;
}
export = VisualElement;

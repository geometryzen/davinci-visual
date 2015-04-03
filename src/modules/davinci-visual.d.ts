//
// davinci-visual.d.ts
//
// This file was created manually in order to support the davinci-visual library.
//
declare module visual
{
    class RevolutionGeometry extends THREE.Geometry
    {
      constructor(points, generator, segments, phiStart, phiLength, attitude) {}
    }
    class ArrowGeometry extends RevolutionGeometry
    {
      constructor(scale, attitude?: THREE.Quaternion, segments?, length?: number, radiusShaft?: number, radiusCone?: number, lengthCone?: number, axis?: THREE.Vector3) {}
    }
    class VisualElement<T extends THREE.Geometry>
    {
      geometry: T;
      material: THREE.MeshLambertMaterial;
      mesh: THREE.Mesh;
      constructor(geometry: T, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    class Arrow extends VisualElement<ArrowGeometry>
    {
      constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    class Box extends VisualElement<THREE.BoxGeometry>
    {
      constructor(width: number, height: number, depth: number, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    class Vortex extends VisualElement<VortexGeometry>
    {
      constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    function trackball(object: THREE.Object3D, wnd: Window): TrackBall {}
}
declare module visual {
    var VERSION: string;
}

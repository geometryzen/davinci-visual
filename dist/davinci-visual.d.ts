//
// davinci-visual.d.ts
//
// This file was created manually in order to support the davinci-visual library.
//
declare module visual
{
    interface MaterialParameters {
      /**
       * Float in the range of 0.0 - 1.0 indicating how transparent the material is.
       * A value of 0.0 indicates fully transparent, 1.0 is fully opaque.
       * If transparent is not set to true for the material, the material will remain fully opaque and this value will only affect its color.
       */
      opacity?: number;
      transparent?: boolean;
    }
    interface LambertMaterialParameters extends MaterialParameters {
      color?: number;
    }
    class RevolutionGeometry extends THREE.Geometry
    {
      constructor(points, generator, segments, phiStart, phiLength, attitude) {}
    }
    class ArrowGeometry extends RevolutionGeometry
    {
      constructor(scale, attitude?: THREE.Quaternion, segments?, length?: number, radiusShaft?: number, radiusCone?: number, lengthCone?: number, axis?: THREE.Vector3) {}
    }
    class VisualElement<T extends THREE.Geometry> extends THREE.Mesh
    {
      geometry: T;
      material: THREE.MeshLambertMaterial;
      constructor(geometry: T, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    class Arrow extends VisualElement<ArrowGeometry>
    {
      constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    /**
     * The parameters used in constructing the BoxGeometry.
     */
    interface BoxGeometryParameters {
    }
    class Box extends VisualElement<THREE.BoxGeometry>
    {
      constructor(width: number, height: number, depth: number, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    /**
     * The parameters used in constructing the SphereGeometry.
     */
    interface SphereGeometryParameters {
      radius?: number;
      widthSegments?: number;
      heightSegments?: number;
      phiStart?: number;
      phiLength?: number;
      thetaStart?: number;
      thetaLength?: number;
    }
    /**
     * A class for generating spherical objects.
     */
    class Sphere extends VisualElement<THREE.SphereGeometry> {
      constructor(geometry?: SphereGeometryParameters, material?: LambertMaterialParameters) {}
    }
    class Vortex extends VisualElement<VortexGeometry> {
      constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
    interface TrackBall {
      
    }
    function trackball(object: THREE.Object3D, wnd: Window): TrackBall {}
    class Visual {
      constructor(wnd: Window) {};
      setUp: () => void;
      tearDown: () => void;
      update: () => void;
      scene: THREE.Scene;
      stage: createjs.Stage;
    }
}
declare module visual {
    var VERSION: string;
}

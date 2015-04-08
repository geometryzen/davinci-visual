/// <reference path="../typings/threejs/three.d.ts" />
/// <reference path="../vendor/davinci-blade/dist/davinci-blade.d.ts" />
/// <reference path="../typings/createjs/createjs.d.ts" />
declare module visual {
}
declare module visual {
    class RevolutionGeometry extends THREE.Geometry {
        constructor(points: any, generator: any, segments: any, phiStart: any, phiLength: any, attitude: any);
    }
}
declare module visual {
    class ArrowGeometry extends RevolutionGeometry {
        constructor(scale: number, attitude?: THREE.Quaternion, segments?: number, length?: number, radiusShaft?: number, radiusCone?: number, lengthCone?: number, axis?: THREE.Vector3);
    }
}
declare module visual {
    interface ArrowGeometryParameters {
        scale?: number;
    }
}
declare module visual {
    /**
     * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
     */
    class VisualElement<T extends THREE.Geometry> extends THREE.Mesh {
        geometry: T;
        material: THREE.MeshLambertMaterial;
        constructor(geometry: T, color: number, opacity?: number, transparent?: boolean);
        pos: blade.Euclidean3;
        attitude: blade.Euclidean3;
    }
}
declare module visual {
    class Arrow extends VisualElement<ArrowGeometry> {
        constructor(parameters?: {
            scale?: number;
        });
    }
}
declare module visual {
    class Box extends VisualElement<THREE.BoxGeometry> {
        constructor(width: number, height: number, depth: number, color: number, opacity?: number, transparent?: boolean);
    }
}
declare module visual {
    interface MaterialParameters {
        opacity?: number;
        transparent?: boolean;
    }
}
declare module visual {
    interface LambertMaterialParameters extends MaterialParameters {
        color?: number;
    }
}
declare module visual {
    interface SphereGeometryParameters {
        radius?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
    }
}
declare module visual {
    class Sphere extends VisualElement<THREE.SphereGeometry> {
        constructor(g?: SphereGeometryParameters, m?: LambertMaterialParameters);
    }
}
declare module visual {
    interface TrackBall {
        enabled: boolean;
        rotateSpeed: number;
        zoomSpeed: number;
        panSpeed: number;
        noRotate: boolean;
        noZoom: boolean;
        noPan: boolean;
        staticMoving: boolean;
        dynamicDampingFactor: number;
        minDistance: number;
        maxDistance: number;
        keys: number[];
        update: () => void;
        handleResize: () => void;
    }
}
declare module visual {
    class Workbench2D {
        canvas: HTMLCanvasElement;
        wnd: Window;
        private sizer;
        constructor(canvas: HTMLCanvasElement, wnd: Window);
        setUp(): void;
        tearDown(): void;
    }
}
declare module visual {
    class Workbench3D {
        canvas: HTMLCanvasElement;
        wnd: Window;
        private sizer;
        constructor(canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, controls: any, wnd: Window);
        setUp(): void;
        tearDown(): void;
    }
}
declare module visual {
    var trackball: (object: THREE.Object3D, wnd: Window) => TrackBall;
}
declare module visual {
    class Visual {
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        workbench3D: Workbench3D;
        canvas2D: HTMLCanvasElement;
        workbench2D: Workbench2D;
        stage: createjs.Stage;
        controls: TrackBall;
        constructor(wnd: Window);
        add(object: THREE.Object3D): void;
        setUp(): void;
        tearDown(): void;
        update(): void;
    }
}
declare module visual {
    class VortexGeometry extends THREE.Geometry {
        constructor(radius: any, radiusCone: any, radiusShaft: any, lengthCone: any, lengthShaft: any, arrowSegments: any, radialSegments: any);
    }
}
declare module visual {
    /**
     * Vortex is used to represent geometric objects with a non-zero curl.
     */
    class Vortex extends VisualElement<VortexGeometry> {
        constructor(scale: number, color: number, opacity?: number, transparent?: boolean);
    }
}
/**
 *
 */
declare module visual {
    /**
     * The version of the visual module.
     */
    var VERSION: string;
    /**
     * Returns a grade zero Euclidean 3D multivector.
     * @param w The scalar value.
     */
    function scalarE3(w: number): blade.Euclidean3;
    /**
     * Returns a grade one Euclidean 3D multivector with the specified Cartesian coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param z The z-coordinate.
     */
    function vectorE3(x: number, y: number, z: number): blade.Euclidean3;
    /**
     * Returns a grade two Euclidean 3D multivector with the specified Cartesian coordinates.
     * @param xy The xy-coordinate.
     * @param yz The yz-coordinate.
     * @param zx The zx-coordinate.
     */
    function bivectorE3(xy: number, yz: number, zx: number): blade.Euclidean3;
}

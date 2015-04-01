/// <reference path="../../typings/threejs/three.d.ts" />
import RevolutionGeometry = require('davinci-visual/RevolutionGeometry');
declare class ArrowGeometry extends RevolutionGeometry {
    constructor(scale: any, attitude?: THREE.Quaternion, segments?: any, length?: number, radiusShaft?: number, radiusCone?: number, lengthCone?: number, axis?: THREE.Vector3);
}
export = ArrowGeometry;

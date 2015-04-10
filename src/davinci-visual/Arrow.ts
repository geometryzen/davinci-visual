/// <reference path="ArrowGeometry.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
    export class Arrow extends VisualElement<ArrowGeometry> {
        constructor(parameters?: { scale?: number; axis?: { x: number; y: number; z: number}; color?: number; opacity?: number; transparent?: boolean }) {
            parameters = parameters || {};
            var scale = parameters.scale || 1.0;
            var attitude = new THREE.Quaternion(0,0,0,1);
            var segments: number = undefined;
            var length: number = 1.0 * scale;
            var radiusShaft = 0.01 * scale;
            var radiusCone = 0.08 * scale;
            var lengthCone = 0.2 * scale;
            var axis = parameters.axis || {x: 0, y: 0, z: 1};
            super(new ArrowGeometry(scale, attitude, segments, length, radiusShaft, radiusCone, lengthCone, axis), parameters.color, parameters.opacity, parameters.transparent);
        }
    }
}

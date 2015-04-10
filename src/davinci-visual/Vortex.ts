/// <reference path="VortexGeometry.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
    /**
     * Vortex is used to represent geometric objects with a non-zero curl.
     */
    export class Vortex extends VisualElement<VortexGeometry> {
        constructor(scale: number = 1.0, color: number = 0xFFFFFF, opacity: number = 1.0, transparent: boolean = false) {
            var radius = scale;
            var radiusCone = scale * 0.08;
            super(new VortexGeometry(radius, radiusCone, 0.01, 0.02, 0.075), color, opacity, transparent);
        }
    }
}

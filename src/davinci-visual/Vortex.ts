/// <reference path="VortexGeometry.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
    /**
     * Vortex is used to represent geometric objects with a non-zero curl.
     */
    export class Vortex extends VisualElement<VortexGeometry> {
        constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false) {
            super(new VortexGeometry(4.0, 0.32, 0.04, 0.08, 0.3, 8, 12), color, opacity, transparent);
        }
    }
}

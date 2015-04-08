/// <reference path="ArrowGeometry.ts"/>
/// <reference path="ArrowGeometryParameters.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
    export class Arrow extends VisualElement<ArrowGeometry> {
        constructor(parameters?: {scale?: number}) {
            parameters = parameters || {};
            parameters.scale = parameters.scale || 1.0;
            var g: ArrowGeometryParameters = {};
            var m: LambertMaterialParameters = {};
            super(new ArrowGeometry(parameters.scale), m.color, m.opacity, m.transparent);
        }
    }
}

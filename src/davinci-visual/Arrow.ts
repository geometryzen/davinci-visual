/// <reference path="ArrowGeometry.ts"/>
/// <reference path="VisualElement.ts"/>
module visual {
    export class Arrow extends VisualElement<ArrowGeometry> {
        constructor(parameters?: { scale?: number; color?: number; }) {
            parameters = parameters || {};
            parameters.scale = parameters.scale || 1.0;
            var m: LambertMaterialParameters = {};
            super(new ArrowGeometry(parameters.scale), parameters.color, m.opacity, m.transparent);
        }
    }
}

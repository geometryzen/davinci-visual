import VisualElement = require('davinci-visual/VisualElement');
import ArrowGeometry = require('davinci-visual/ArrowGeometry');
declare class Arrow extends VisualElement<ArrowGeometry> {
    constructor(scale: number, color: number, opacity?: number, transparent?: boolean);
}
export = Arrow;

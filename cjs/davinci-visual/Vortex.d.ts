import VisualElement = require('davinci-visual/VisualElement');
import VortexGeometry = require('davinci-visual/VortexGeometry');
declare class Vortex extends VisualElement<VortexGeometry> {
    constructor(scale: number, color: number, opacity?: number, transparent?: boolean);
}
export = Vortex;

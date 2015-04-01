import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');
import Vortex = require('davinci-visual/Vortex');
import VisualElement = require('davinci-visual/VisualElement');
/**
 * Provides the visual module
 *
 * @module visual
 */
declare var visual: {
    'VERSION': string;
    Arrow: typeof Arrow;
    Box: typeof Box;
    Vortex: typeof Vortex;
    VisualElement: typeof VisualElement;
};
export = visual;

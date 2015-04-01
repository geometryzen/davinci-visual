import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');
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
    VisualElement: typeof VisualElement;
};
export = visual;

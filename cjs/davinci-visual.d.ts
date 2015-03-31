import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');
/**
 * Provides the visual module
 *
 * @module visual
 */
declare var visual: {
    'VERSION': string;
    Arrow: typeof Arrow;
    Box: typeof Box;
};
export = visual;

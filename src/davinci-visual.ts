import core = require('davinci-visual/core');
import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');

/**
 * Provides the visual module
 *
 * @module visual
 */
var visual = {
    'VERSION': core.VERSION,
    Arrow: Arrow,
    Box: Box
};
export = visual;
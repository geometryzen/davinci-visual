var core = require('davinci-visual/core');
var Arrow = require('davinci-visual/Arrow');
var Box = require('davinci-visual/Box');
var VisualElement = require('davinci-visual/VisualElement');
/**
 * Provides the visual module
 *
 * @module visual
 */
var visual = {
    'VERSION': core.VERSION,
    Arrow: Arrow,
    Box: Box,
    VisualElement: VisualElement
};
module.exports = visual;

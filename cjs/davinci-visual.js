var core = require('davinci-visual/core');
var Arrow = require('davinci-visual/Arrow');
var Box = require('davinci-visual/Box');
var Vortex = require('davinci-visual/Vortex');
var VisualElement = require('davinci-visual/VisualElement');
var trackball = require('davinci-visual/trackball');
/**
 * Provides the visual module
 *
 * @module visual
 */
var visual = {
    'VERSION': core.VERSION,
    Arrow: Arrow,
    Box: Box,
    Vortex: Vortex,
    VisualElement: VisualElement,
    trackball: trackball
};
module.exports = visual;

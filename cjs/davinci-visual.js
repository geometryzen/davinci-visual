var core = require('davinci-visual/core');
var Arrow = require('davinci-visual/Arrow');
var Box = require('davinci-visual/Box');
var Vortex = require('davinci-visual/Vortex');
var VisualElement = require('davinci-visual/VisualElement');
var trackball = require('davinci-visual/trackball');
var Visual = require('davinci-visual/Visual');
var Workbench2D = require('davinci-visual/Workbench2D');
var Workbench3D = require('davinci-visual/Workbench3D');
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
    trackball: trackball,
    Visual: Visual,
    Workbench2D: Workbench2D,
    Workbench3D: Workbench3D
};
module.exports = visual;

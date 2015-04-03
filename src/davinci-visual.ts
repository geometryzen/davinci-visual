import core = require('davinci-visual/core');
import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');
import Vortex = require('davinci-visual/Vortex');
import VisualElement = require('davinci-visual/VisualElement');
import trackball = require('davinci-visual/trackball');
import TrackBall = require('davinci-visual/TrackBall');
import Visual = require('davinci-visual/Visual');
import Workbench2D = require('davinci-visual/Workbench2D');
import Workbench3D = require('davinci-visual/Workbench3D');

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
export = visual;

import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');
import Vortex = require('davinci-visual/Vortex');
import VisualElement = require('davinci-visual/VisualElement');
import TrackBall = require('davinci-visual/TrackBall');
import Visual = require('davinci-visual/Visual');
import Workbench2D = require('davinci-visual/Workbench2D');
import Workbench3D = require('davinci-visual/Workbench3D');
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
    trackball: (object: THREE.Object3D, wnd: Window) => TrackBall;
    Visual: typeof Visual;
    Workbench2D: typeof Workbench2D;
    Workbench3D: typeof Workbench3D;
};
export = visual;

import Arrow = require('davinci-visual/Arrow');
import Box = require('davinci-visual/Box');
import Vortex = require('davinci-visual/Vortex');
import VisualElement = require('davinci-visual/VisualElement');
import TrackBall = require('davinci-visual/TrackBall');
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
};
export = visual;

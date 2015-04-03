define(["require", "exports", 'davinci-visual/core', 'davinci-visual/Arrow', 'davinci-visual/Box', 'davinci-visual/Vortex', 'davinci-visual/VisualElement', 'davinci-visual/trackball', 'davinci-visual/Visual', 'davinci-visual/Workbench2D', 'davinci-visual/Workbench3D'], function (require, exports, core, Arrow, Box, Vortex, VisualElement, trackball, Visual, Workbench2D, Workbench3D) {
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
    return visual;
});

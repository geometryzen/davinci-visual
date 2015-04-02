define(["require", "exports", 'davinci-visual/core', 'davinci-visual/Arrow', 'davinci-visual/Box', 'davinci-visual/Vortex', 'davinci-visual/VisualElement', 'davinci-visual/trackball'], function (require, exports, core, Arrow, Box, Vortex, VisualElement, trackball) {
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
    return visual;
});

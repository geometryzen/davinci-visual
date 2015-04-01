define(["require", "exports", 'davinci-visual/core', 'davinci-visual/Arrow', 'davinci-visual/Box', 'davinci-visual/VisualElement'], function (require, exports, core, Arrow, Box, VisualElement) {
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
    return visual;
});

define(["require", "exports", 'davinci-visual/core', 'davinci-visual/Arrow', 'davinci-visual/Box'], function (require, exports, core, Arrow, Box) {
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
    return visual;
});

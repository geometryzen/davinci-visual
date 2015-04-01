var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualElement = require('davinci-visual/VisualElement');
var ArrowGeometry = require('davinci-visual/ArrowGeometry');
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow(scale, color, opacity, transparent) {
        if (opacity === void 0) { opacity = 1.0; }
        if (transparent === void 0) { transparent = false; }
        _super.call(this, new ArrowGeometry(scale), color, opacity, transparent);
    }
    return Arrow;
})(VisualElement);
module.exports = Arrow;

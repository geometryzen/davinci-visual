var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'davinci-visual/VisualElement', 'davinci-visual/VortexGeometry'], function (require, exports, VisualElement, VortexGeometry) {
    var Vortex = (function (_super) {
        __extends(Vortex, _super);
        function Vortex(scale, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            _super.call(this, new VortexGeometry(4.0, 0.32, 0.04, 0.08, 0.3, 8, 12), color, opacity, transparent);
        }
        return Vortex;
    })(VisualElement);
    return Vortex;
});

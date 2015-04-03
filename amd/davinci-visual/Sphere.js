var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'davinci-visual/VisualElement'], function (require, exports, VisualElement) {
    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(options, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            _super.call(this, new THREE.SphereGeometry(options.radius, options.widthSegments, options.heightSegments), color, opacity, transparent);
        }
        return Sphere;
    })(VisualElement);
    return Sphere;
});

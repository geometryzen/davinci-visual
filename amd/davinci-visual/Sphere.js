var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'davinci-visual/VisualElement'], function (require, exports, VisualElement) {
    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(g, m) {
            _super.call(this, new THREE.SphereGeometry(g.radius, g.widthSegments, g.heightSegments), m.color, m.opacity, m.transparent);
        }
        return Sphere;
    })(VisualElement);
    return Sphere;
});

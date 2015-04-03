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
            g = g || {};
            g.radius = g.radius || 1.0;
            g.widthSegments = g.widthSegments || 16;
            g.heightSegments = g.heightSegments || 12;
            m = m || {};
            m.color = m.color || 0xFFFFFF;
            _super.call(this, new THREE.SphereGeometry(g.radius, g.widthSegments, g.heightSegments), m.color, m.opacity, m.transparent);
        }
        return Sphere;
    })(VisualElement);
    return Sphere;
});

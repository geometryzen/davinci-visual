///<reference path="../../typings/threejs/three.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
 */
var VisualElement = (function (_super) {
    __extends(VisualElement, _super);
    function VisualElement(geometry, color, opacity, transparent) {
        if (opacity === void 0) { opacity = 1.0; }
        if (transparent === void 0) { transparent = false; }
        this.geometry = geometry;
        this.material = new THREE.MeshLambertMaterial({ "color": color, "opacity": opacity, "transparent": transparent });
        _super.call(this, geometry, this.material);
    }
    return VisualElement;
})(THREE.Mesh);
module.exports = VisualElement;

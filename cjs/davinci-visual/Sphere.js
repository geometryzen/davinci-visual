var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../../typings/threejs/three.d.ts"/>
var VisualElement = require('davinci-visual/VisualElement');
var Sphere = (function (_super) {
    __extends(Sphere, _super);
    function Sphere(radius, color, opacity, transparent) {
        if (opacity === void 0) { opacity = 1.0; }
        if (transparent === void 0) { transparent = false; }
        _super.call(this, new THREE.SphereGeometry(radius), color, opacity, transparent);
    }
    return Sphere;
})(VisualElement);
module.exports = Sphere;
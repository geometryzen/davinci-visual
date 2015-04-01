var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../../typings/threejs/three.d.ts"/>
var VisualElement = require('davinci-visual/VisualElement');
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(width, height, depth, color, opacity, transparent) {
        if (opacity === void 0) { opacity = 1.0; }
        if (transparent === void 0) { transparent = false; }
        _super.call(this, new THREE.BoxGeometry(width, height, depth), color, opacity, transparent);
    }
    return Box;
})(VisualElement);
module.exports = Box;

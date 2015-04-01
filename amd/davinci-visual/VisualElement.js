///<reference path="../../typings/threejs/three.d.ts"/>
define(["require", "exports"], function (require, exports) {
    /**
     * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
     */
    var VisualElement = (function () {
        function VisualElement(geometry, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            this.geometry = geometry;
            this.material = new THREE.MeshLambertMaterial({ "color": color, "opacity": opacity, "transparent": transparent });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
        }
        Object.defineProperty(VisualElement.prototype, "position", {
            get: function () {
                return this.mesh.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "quaternion", {
            get: function () {
                return this.mesh.quaternion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "scale", {
            get: function () {
                return this.mesh.scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "opacity", {
            get: function () {
                return this.material.opacity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "color", {
            get: function () {
                return this.material.color;
            },
            enumerable: true,
            configurable: true
        });
        return VisualElement;
    })();
    return VisualElement;
});

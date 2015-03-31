define(["require", "exports"], function (require, exports) {
    /// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts" />
    /// <reference path="../../typings/threejs/three.d.ts" />
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
            set: function (p) {
                this.mesh.position.set(p.x, p.y, p.z);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "attitude", {
            get: function () {
                var q = this.mesh.quaternion;
                return new blade.Euclidean3(q.w, 0, 0, 0, -q.z, -q.x, -q.y, 0);
            },
            set: function (rotor) {
                this.mesh.quaternion.set(-rotor.yz, -rotor.zx, -rotor.xy, rotor.w);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "scale", {
            get: function () {
                return this.mesh.scale;
            },
            set: function (value) {
                this.mesh.scale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "color", {
            set: function (color) {
                this.material.color = color;
            },
            enumerable: true,
            configurable: true
        });
        return VisualElement;
    })();
    return VisualElement;
});

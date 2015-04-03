define(["require", "exports"], function (require, exports) {
    function removeElementsByTagName(doc, tagName) {
        var elements = doc.getElementsByTagName(tagName);
        for (var i = elements.length - 1; i >= 0; i--) {
            var e = elements[i];
            e.parentNode.removeChild(e);
        }
    }
    var Workbench3D = (function () {
        function Workbench3D(canvas, renderer, camera, controls, wnd) {
            this.canvas = canvas;
            this.wnd = wnd;
            function onWindowResize(event) {
                var width = wnd.innerWidth;
                var height = wnd.innerHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                controls.handleResize();
            }
            this.sizer = onWindowResize;
        }
        Workbench3D.prototype.setUp = function () {
            this.wnd.document.body.insertBefore(this.canvas, this.wnd.document.body.firstChild);
            this.wnd.addEventListener('resize', this.sizer, false);
            this.sizer(null);
        };
        Workbench3D.prototype.tearDown = function () {
            this.wnd.removeEventListener('resize', this.sizer, false);
            removeElementsByTagName(this.wnd.document, "canvas");
        };
        return Workbench3D;
    })();
    return Workbench3D;
});

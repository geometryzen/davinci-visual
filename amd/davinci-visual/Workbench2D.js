define(["require", "exports"], function (require, exports) {
    function removeElementsByTagName(doc, tagName) {
        var elements = doc.getElementsByTagName(tagName);
        for (var i = elements.length - 1; i >= 0; i--) {
            var e = elements[i];
            e.parentNode.removeChild(e);
        }
    }
    var Workbench2D = (function () {
        function Workbench2D(canvas, wnd) {
            this.canvas = canvas;
            this.wnd = wnd;
            function onWindowResize(event) {
                var width = wnd.innerWidth;
                var height = wnd.innerHeight;
                canvas.width = width;
                canvas.height = height;
            }
            this.sizer = onWindowResize;
        }
        Workbench2D.prototype.setUp = function () {
            this.wnd.document.body.insertBefore(this.canvas, this.wnd.document.body.firstChild);
            this.wnd.addEventListener('resize', this.sizer, false);
            this.sizer(null);
        };
        Workbench2D.prototype.tearDown = function () {
            this.wnd.removeEventListener('resize', this.sizer, false);
            removeElementsByTagName(this.wnd.document, "canvas");
        };
        return Workbench2D;
    })();
    return Workbench2D;
});

define(["require", "exports", 'davinci-visual/trackball', 'davinci-visual/Workbench2D', 'davinci-visual/Workbench3D'], function (require, exports, trackball, Workbench2D, Workbench3D) {
    var Visual = (function () {
        function Visual(wnd) {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 10000);
            this.renderer = new THREE.WebGLRenderer();
            var ambientLight = new THREE.AmbientLight(0x111111);
            this.scene.add(ambientLight);
            var pointLight = new THREE.PointLight(0xFFFFFF);
            pointLight.position.set(20.0, 20.0, 20.0);
            this.scene.add(pointLight);
            var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
            directionalLight.position.set(0.0, 1.0, 0.0);
            this.scene.add(directionalLight);
            this.camera.position.set(10.0, 9.0, 8.0);
            this.camera.up.set(0, 0, 1);
            this.camera.lookAt(this.scene.position);
            this.controls = trackball(this.camera, wnd);
            this.renderer.setClearColor(new THREE.Color(0x080808), 1.0);
            this.workbench3D = new Workbench3D(this.renderer.domElement, this.renderer, this.camera, this.controls, wnd);
            this.canvas2D = wnd.document.createElement("canvas");
            this.canvas2D.style.position = "absolute";
            this.canvas2D.style.top = "0px";
            this.canvas2D.style.left = "0px";
            this.workbench2D = new Workbench2D(this.canvas2D, wnd);
            this.stage = new createjs.Stage(this.canvas2D);
            this.stage.autoClear = true;
            this.controls.rotateSpeed = 1.0;
            this.controls.zoomSpeed = 1.2;
            this.controls.panSpeed = 0.8;
            this.controls.noZoom = false;
            this.controls.noPan = false;
            this.controls.staticMoving = true;
            this.controls.dynamicDampingFactor = 0.3;
            this.controls.keys = [65, 83, 68];
            function render() {
            }
            //  this.controls.addEventListener( 'change', render );
        }
        Visual.prototype.add = function (object) {
            this.scene.add(object);
        };
        Visual.prototype.setUp = function () {
            this.workbench3D.setUp();
            this.workbench2D.setUp();
        };
        Visual.prototype.tearDown = function () {
            this.workbench3D.tearDown();
            this.workbench2D.tearDown();
        };
        Visual.prototype.update = function () {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.stage.update();
        };
        return Visual;
    })();
    return Visual;
});

/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts"/>
module visual {
    /**
     * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
     */
    export class VisualElement<T extends THREE.Geometry> extends THREE.Mesh
    {
      public geometry: T;
      public material: THREE.MeshLambertMaterial;
      constructor(geometry: T, color: number, opacity: number = 1.0, transparent: boolean = false)
      {
        this.geometry = geometry;
        this.material = new THREE.MeshLambertMaterial({"color": color,"opacity": opacity,"transparent": transparent});
        super(geometry, this.material);
      }
      set attitude(rotor: blade.Euclidean3) {
        this.quaternion.set(-rotor.yz, -rotor.zx, -rotor.xy, rotor.w);
      }
    }
}

/// <reference path="../../typings/threejs/three.d.ts"/>
/// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts"/>
module visual {
    /**
     * Mesh provides the common behavior for all Mesh (Geometry, Material) objects.
     * Mesh may be used in place of a THREE.Mesh and provides additional features
     * for Geometric Algebra manipulations.
     */
    export class Mesh<G extends THREE.Geometry, M extends THREE.Material> extends THREE.Mesh
    {
      /**
       * The geometry used in constructing the Mesh.
       */
      public geometry: G;
      /**
       * The material used in constructing the Mesh.
       */
      public material: M;
      constructor(geometry: G, material: M)
      {
        this.geometry = geometry;
        this.material = material;
        super(geometry, this.material);
      }
      /**
       * The get `pos` property is a position vector that is a copy of this.position.
       * The set `pos` property manipulates this.position using a vector.
       */
      get pos(): blade.Euclidean3 {
        var position = this.position;
        return new blade.Euclidean3(0, position.x, position.y, position.z, 0, 0, 0, 0);
      }
      set pos(vector: blade.Euclidean3) {
        this.position.set(vector.x, vector.y, vector.z);
      }
      /**
       * The get `attitude` property is a rotor and a copy of this.quaternion.
       * The set `attitude` property manipulates this.quaternion using a rotor.
       */
      get attitude(): blade.Euclidean3 {
        var q = this.quaternion;
        return new blade.Euclidean3(q.w, 0, 0, 0, -q.z, -q.x, -q.y, 0);
      }
      set attitude(rotor: blade.Euclidean3) {
        this.quaternion.set(-rotor.yz, -rotor.zx, -rotor.xy, rotor.w);
      }
    }
}

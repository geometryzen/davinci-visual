/// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts" />
/// <reference path="../../typings/threejs/three.d.ts" />
/**
 * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
 */
class VisualElement<T extends THREE.Geometry>
{
  public geometry: T;
  public material: THREE.MeshLambertMaterial;
  public mesh: THREE.Mesh;
  constructor(geometry: T, color: number, opacity: number = 1.0, transparent: boolean = false)
  {
    this.geometry = geometry;
    this.material = new THREE.MeshLambertMaterial({"color": color,"opacity": opacity,"transparent": transparent});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  set position(p: blade.Euclidean3)
  {
    this.mesh.position.set(p.x, p.y, p.z);
  }
  get attitude(): blade.Euclidean3
  {
    var q: THREE.Quaternion = this.mesh.quaternion;
    return new blade.Euclidean3(q.w, 0, 0, 0, -q.z, -q.x, -q.y, 0);
  }
  set attitude(rotor: blade.Euclidean3)
  {
    this.mesh.quaternion.set(-rotor.yz, -rotor.zx, -rotor.xy, rotor.w);
  }
  get scale(): THREE.Vector3
  {
    return this.mesh.scale;
  }
  set scale(value: THREE.Vector3)
  {
    this.mesh.scale = value;
  }
  
  set color(color: THREE.Color)
  {
    this.material.color = color;
  }
}
export = VisualElement;

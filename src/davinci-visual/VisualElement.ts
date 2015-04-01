///<reference path="../../typings/threejs/three.d.ts"/>

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
  get position()
  {
    return this.mesh.position;
  }
  get quaternion(): THREE.Quaternion
  {
    return this.mesh.quaternion;
  }
  get scale(): THREE.Vector3
  {
    return this.mesh.scale;
  }
  get opacity(): number
  {
    return this.material.opacity;
  }
  get color(): THREE.Color
  {
    return this.material.color;
  }
}
export = VisualElement;

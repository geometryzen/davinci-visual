/// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts"/>
/**
 *
 */
module visual {
    /**
     * The version of the visual module.
     */
    export var VERSION: string = '0.0.40';
    /**
     * Returns a grade zero Euclidean 3D multivector.
     * @param w The scalar value.
     */
    export function scalarE3(w: number) {
      return new blade.Euclidean3(w, 0, 0, 0, 0, 0, 0, 0);
    }
    /**
     * Returns a grade one Euclidean 3D multivector with the specified Cartesian coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param z The z-coordinate.
     */
    export function vectorE3(x: number, y: number, z: number) {
      return new blade.Euclidean3(0, x, y, z, 0, 0, 0, 0);
    }
};

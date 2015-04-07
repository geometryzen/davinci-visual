/// <reference path="../../vendor/davinci-blade/dist/davinci-blade.d.ts"/>
/**
 *
 */
module visual {
    /**
     * The version of the visual module.
     */
    export var VERSION: string = '0.0.39';
    /**
     * Returns a vector with the specified Cartesian coordinates.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param z The z-coordinate.
     */
    export function vector(x: number, y: number, z: number) {
      return new blade.Euclidean3(0, x, y, z, 0, 0, 0, 0);
    }
};

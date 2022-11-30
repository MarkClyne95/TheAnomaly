import { Vector3 } from "@babylonjs/core";
export default class Functions {
    /**  calculate the dot product between two vectors and return the angle between them
     *  can be used to return the angle between the forward vector of the player and an object
     *  if the return value is less than a certain threshold, enable interaction for example
     * @param motion : the motion vector
     * @param force : the force vector
     */
    _dotProduct(motion: Vector3, force: Vector3): number;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions = /** @class */ (function () {
    function Functions() {
    }
    /**  calculate the dot product between two vectors and return the angle between them
     *  can be used to return the angle between the forward vector of the player and an object
     *  if the return value is less than a certain threshold, enable interaction for example
     * @param motion : the motion vector
     * @param force : the force vector
     */
    Functions.prototype._dotProduct = function (motion, force) {
        var dp = 0.0;
        dp = (motion.x * force.x) + (motion.y * force.y) + (motion.z * force.z);
        return dp;
    };
    return Functions;
}());
exports.default = Functions;
//# sourceMappingURL=functions.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var DoorInteraction = /** @class */ (function () {
    function DoorInteraction() {
        this.playerRef = new player_1.default();
    }
    DoorInteraction.prototype.onStart = function () {
        this.playerRef.SetBatteryCount(12);
    };
    DoorInteraction.prototype.onUpdate = function () {
    };
    DoorInteraction.prototype.onCollide = function () {
    };
    return DoorInteraction;
}());
exports.default = DoorInteraction;
//# sourceMappingURL=DoorInteraction.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var player = /** @class */ (function () {
    function player() {
    }
    player.prototype.SetTool = function (param) {
        this.hasTool = param;
    };
    player.prototype.SetFirstDoorFlag = function (param) {
        this.firstDoorFlag = param;
    };
    player.prototype.SetSecondDoorFlag = function (param) {
        this.secondDoorFlag = param;
    };
    player.prototype.SetBatteryCount = function (num) {
        this.batteryCount = num;
    };
    player.prototype.onStart = function () {
        this.batteryCount = 12;
        console.log(this.batteryCount);
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("boolean", "Has Multitool", false)
    ], player.prototype, "hasTool", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("boolean", "First Door Flag", false)
    ], player.prototype, "firstDoorFlag", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("boolean", "Second Door Flag", false)
    ], player.prototype, "secondDoorFlag", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "Battery Count", 0)
    ], player.prototype, "batteryCount", void 0);
    return player;
}());
exports.default = player;
//# sourceMappingURL=player.js.map
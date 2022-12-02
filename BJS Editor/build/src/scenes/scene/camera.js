"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var BABYLON = require("@babylonjs/core");
var decorators_1 = require("../decorators");
var PlayerCamera = /** @class */ (function (_super) {
    __extends(PlayerCamera, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function PlayerCamera() {
        var _this = this;
        _this.test = 1;
        //Hidden in Editor
        _this._hasInteracted = false;
        return _this;
    }
    /**
     * Called on the scene starts.
     */
    PlayerCamera.prototype.onStart = function () {
        // For the example, let's configure the keys of the camera using the @visibleInInspector decorator.
        this.keysUp = [this._forwardKey];
        this.keysDown = [this._backwardKey];
        this.keysLeft = [this._strafeLeftKey];
        this.keysRight = [this._strafeRightKey];
    };
    /**
     * Called each frame.
     */
    PlayerCamera.prototype.onUpdate = function () {
        // Nothing to do now...
    };
    /**
     * Called on the user clicks on the canvas.
     * Used to request pointer lock and launch a new ball.
     */
    PlayerCamera.prototype._onPointerEvent = function (info) {
        this._enterPointerLock();
    };
    //#region keyboard events
    /**
     * Called on the escape key (key code 27) is up.
     * Used to exit pointer lock.
     */
    PlayerCamera.prototype._onEscapeKey = function () {
        var engine = this.getEngine();
        if (engine.isPointerLock) {
            engine.exitPointerlock();
        }
    };
    PlayerCamera.prototype._keyDown = function (info) {
        this.speed = 12;
    };
    PlayerCamera.prototype._keyUp = function (info) {
        this.speed = 8;
    };
    PlayerCamera.prototype._key2Down = function (info) {
        //this.cameraDirection.y += 20;
        this.cameraDirection.y += 50;
    };
    PlayerCamera.prototype._key2Up = function (info) {
        //this.cameraDirection.y += 10;
        console.log("Jump");
    };
    //set up interact key
    PlayerCamera.prototype._interact = function (info) {
        this.scene = this.getScene();
        this.engine = this.getEngine();
        BABYLON.SceneLoader.Load("../../../scenes/scene/", "scene.babylon", this.scene);
        console.log("Interacted");
    };
    //#endregion
    /**
     * Requests the pointer lock.
     */
    PlayerCamera.prototype._enterPointerLock = function () {
        var engine = this.getEngine();
        if (!engine.isPointerLock) {
            engine.enterPointerlock();
        }
    };
    __decorate([
        (0, decorators_1.fromChildren)("ball")
    ], PlayerCamera.prototype, "_ball", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("KeyMap", "Forward Key", "W".charCodeAt(0))
    ], PlayerCamera.prototype, "_forwardKey", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("KeyMap", "Backward Key", "S".charCodeAt(0))
    ], PlayerCamera.prototype, "_backwardKey", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("KeyMap", "Strafe Left Key", "A".charCodeAt(0))
    ], PlayerCamera.prototype, "_strafeLeftKey", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("KeyMap", "Strafe Right Key", "D".charCodeAt(0))
    ], PlayerCamera.prototype, "_strafeRightKey", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "Ball Force Factor", 1)
    ], PlayerCamera.prototype, "_ballForceFactor", void 0);
    __decorate([
        (0, decorators_1.onPointerEvent)(core_1.PointerEventTypes.POINTERDOWN, false)
    ], PlayerCamera.prototype, "_onPointerEvent", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)([27], core_1.KeyboardEventTypes.KEYUP)
    ], PlayerCamera.prototype, "_onEscapeKey", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)([16], core_1.KeyboardEventTypes.KEYDOWN)
    ], PlayerCamera.prototype, "_keyDown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)([16], core_1.KeyboardEventTypes.KEYUP)
    ], PlayerCamera.prototype, "_keyUp", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)([32], core_1.KeyboardEventTypes.KEYDOWN)
    ], PlayerCamera.prototype, "_key2Down", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)([32], core_1.KeyboardEventTypes.KEYUP)
    ], PlayerCamera.prototype, "_key2Up", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)([69], core_1.KeyboardEventTypes.KEYDOWN)
    ], PlayerCamera.prototype, "_interact", null);
    return PlayerCamera;
}(core_1.FreeCamera));
exports.default = PlayerCamera;
//# sourceMappingURL=camera.js.map
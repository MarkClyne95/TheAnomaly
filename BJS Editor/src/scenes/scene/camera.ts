import { FreeCamera, PointerEventTypes, Mesh, PointerInfo, PhysicsImpostor, Vector3, KeyboardEventTypes, KeyboardInfo } from "@babylonjs/core";
import { int } from "babylonjs";

import { fromChildren, visibleInInspector, onPointerEvent, onKeyboardEvent } from "../decorators";

export default class PlayerCamera extends FreeCamera {
    @fromChildren("ball")
    private _ball: Mesh;

    private test = 1;

    //Visible in Editor
    @visibleInInspector("KeyMap", "Forward Key", "W".charCodeAt(0))
    private _forwardKey: number;

    @visibleInInspector("KeyMap", "Backward Key", "S".charCodeAt(0))
    private _backwardKey: number;

    @visibleInInspector("KeyMap", "Strafe Left Key", "A".charCodeAt(0))
    private _strafeLeftKey: number;

    @visibleInInspector("KeyMap", "Strafe Right Key", "D".charCodeAt(0))
    private _strafeRightKey: number;

    @visibleInInspector("number", "Ball Force Factor", 1)
    private _ballForceFactor: number;

    //Hidden in Editor
    private _hasInteracted: boolean = false;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    private constructor() { }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // For the example, let's configure the keys of the camera using the @visibleInInspector decorator.
        this.keysUp = [this._forwardKey];
        this.keysDown = [this._backwardKey];
        this.keysLeft = [this._strafeLeftKey];
        this.keysRight = [this._strafeRightKey];
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // Nothing to do now...
    }

    /**
     * Called on the user clicks on the canvas.
     * Used to request pointer lock and launch a new ball.
     */
    @onPointerEvent(PointerEventTypes.POINTERDOWN, false)
    private _onPointerEvent(info: PointerInfo): void {
        this._enterPointerLock();
    }
//#region keyboard events
    /**
     * Called on the escape key (key code 27) is up.
     * Used to exit pointer lock.
     */
    @onKeyboardEvent([27], KeyboardEventTypes.KEYUP)
    private _onEscapeKey(): void {
        const engine = this.getEngine();
        if (engine.isPointerLock) {
            engine.exitPointerlock();
        }
    }

    @onKeyboardEvent([16], KeyboardEventTypes.KEYDOWN)
    protected _keyDown(info: KeyboardInfo): void {
        this.speed = 12;
    }

    @onKeyboardEvent([16], KeyboardEventTypes.KEYUP)
    protected _keyUp(info: KeyboardInfo): void {
        this.speed = 8;
    }

    
    @onKeyboardEvent([32], KeyboardEventTypes.KEYDOWN)
    protected _key2Down(info: KeyboardInfo): void{
        //this.cameraDirection.y += 20;
            this.cameraDirection.y += 50
       }

    @onKeyboardEvent([32], KeyboardEventTypes.KEYUP)
    protected _key2Up(info: KeyboardInfo): void{
            //this.cameraDirection.y += 10;
        console.log("Jump");
    }

    //set up interact key
    @onKeyboardEvent([69], KeyboardEventTypes.KEYDOWN)
    protected _interact(info: KeyboardInfo): void {
        // if (this._hasInteracted == false)
        //     this._hasInteracted = true;
        // else if (this._hasInteracted == true)
        //     this._hasInteracted = false;
        console.log("Interacted");
    }
//#endregion

    /**
     * Requests the pointer lock.
     */
    private _enterPointerLock(): void {
        const engine = this.getEngine();
        if (!engine.isPointerLock) {
            engine.enterPointerlock();
        }
    }
}

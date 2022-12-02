import { FreeCamera, KeyboardInfo } from "@babylonjs/core";
export default class PlayerCamera extends FreeCamera {
    private _ball;
    private test;
    private scene;
    private engine;
    private _forwardKey;
    private _backwardKey;
    private _strafeLeftKey;
    private _strafeRightKey;
    private _ballForceFactor;
    private _hasInteracted;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    private constructor();
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    /**
     * Called each frame.
     */
    onUpdate(): void;
    /**
     * Called on the user clicks on the canvas.
     * Used to request pointer lock and launch a new ball.
     */
    private _onPointerEvent;
    /**
     * Called on the escape key (key code 27) is up.
     * Used to exit pointer lock.
     */
    private _onEscapeKey;
    protected _keyDown(info: KeyboardInfo): void;
    protected _keyUp(info: KeyboardInfo): void;
    protected _key2Down(info: KeyboardInfo): void;
    protected _key2Up(info: KeyboardInfo): void;
    protected _interact(info: KeyboardInfo): void;
    /**
     * Requests the pointer lock.
     */
    private _enterPointerLock;
}

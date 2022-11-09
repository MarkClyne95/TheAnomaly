import { Scene, ActionManager, ExecuteCodeAction, Observer, Scalar } from '../../../node_modules/@babylonjs/core';

let inputMap;
let _scene;

//movement
let horizontal = 0;
let vertical = 0;
let horizontalAxis = 0;
let verticalAxis = 0;

//interaction buttons
let jumpKeyDown = false;
let interactButtonDown = false;

export default class PlayerInput extends Scene {
    constructor(scene) {
        this._scene = scene;

        this._scene.actionManager = new ActionManager(this._scene);

        this.inputMap = {};
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        //add to the scene

        scene.onBeforeRenderObservable.add(() => {
            this.updateFromKeyboard();
        });


    }

    updateFromKeyboard() {
        //forwards and backwards movement
        if (this.inputMap["W"]) {
            this.verticalAxis = 1;
            this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);
        } else if (this.inputMap["S"]) {
            this.verticalAxis = -1;
            this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
        } else {
            this.vertical = 0;
            this.verticalAxis = 0;
        }

        //left and right movement
        if (this.inputMap["A"]) {
            this.horizontalAxis = -1
            this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
        } else if (this.inputMap["D"]) {
            this.horizontalAxis = 1;
            this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
        } else {
            this.horizontal = 0;
            this.horizontalAxis = 0;
        }

        //jumping and interacting
        if (this.inputMap["E"]) {
            this.interactButtonDown = true;
        } else {
            this.interactButtonDown = false;
        }

        if (this.inputMap[" "]) {
            this.jumpKeyDown = true;
        } else {
            this.jumpKeyDown = false;
        }
    }

}
import { Scene, ActionManager, ExecuteCodeAction, Observer, Scalar } from '../../../node_modules/@babylonjs/core';

let inputMap;
let _scene;

//movement
let horizontal = 0;
let vertical = 0;

export default class PlayerInput extends Scene {
    constructor(scene) {
        this._scene = scene;

        this._scene.actionManager = new ActionManager(this._scene);
    }

    updateFromKeyboard() {

    }

}
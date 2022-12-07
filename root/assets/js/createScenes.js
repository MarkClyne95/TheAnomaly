import MainMenu from "./MainMenu.js";
import game from "./game.js";
import engineRoomCorridor from './engineRoomCorridor.js';
import EngineRoom from "./new js/EngineRoom.js";
import {engineRoomText, engineRoomCorridorText} from "./HUD.js";

const CanvasName = "renderCanvas";

export let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("renderCanvas");
document.body.appendChild(canvas);

export let scene;
export let scenes = [];
export let sceneIndex = 0;

export let engine = new BABYLON.Engine(canvas, true, null, true);


export function setSceneIndex(index) {
    sceneIndex = index;
    switch (sceneIndex){
        case 1:
            engineRoomText();
            break;
        case 2:
            engineRoomCorridorText();
            break;
    }
}

/*******************************************************
 * ANY NEW SCENES YOU CREATE, REMEMBER TO ADD THEM HERE *
 ********************************************************/
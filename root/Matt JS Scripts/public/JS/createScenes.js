import MainMenu  from "./MainMenu.js";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("renderCanvas");
document.body.appendChild(canvas);

export let scene
export let scenes = [];

export let engine = new BABYLON.Engine(canvas, true, null, true);

scenes[0] = MainMenu(engine);
scene = scenes[0].scene;

export function setSceneIndex(i){
    scene = scenes[i].scene;
}

/*******************************************************
* ANY NEW SCENES YOU CREATE, REMEMBER TO ADD THEM HERE *
********************************************************/
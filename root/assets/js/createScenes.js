import { engineRoomText, engineRoomCorridorText } from "./HUD.js";
import PlayVideo from "./new js/PlayVideo.js";

const CanvasName = "renderCanvas";

export let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("renderCanvas");
document.body.appendChild(canvas);

export let scene;
export let scenes = [];
export let sceneIndex = 0;



export let engine = new BABYLON.Engine(canvas, true, null, true);

let playVideo = new PlayVideo(engine, scene);
export let play = playVideo.createScene("../../../root/assets/scenes/opening_cutscene_first_draft.mp4", "../../../root/assets/scenes/Untitled video - Made with Clipchamp.mp4", engine, scene);

export function ResetPlay() {
    play.dispose();
    play = playVideo.createScene("../../../root/assets/scenes/opening_cutscene_first_draft.mp4", "../../../root/assets/scenes/Untitled video - Made with Clipchamp.mp4", engine, scene);
}

export function setSceneIndex(index) {
    sceneIndex = index;
    switch (sceneIndex) {
        case 2:
            engineRoomText();
            break;
        case 3:
            engineRoomCorridorText();
            break;
    }
}

/*******************************************************
 * ANY NEW SCENES YOU CREATE, REMEMBER TO ADD THEM HERE *
 ********************************************************/
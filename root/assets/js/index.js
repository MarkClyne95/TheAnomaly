//import guiScene  from "./guiScene.js";
import { scenes, scene, engine, setSceneIndex, sceneIndex } from "./createScenes.js";
import { EngineRoom } from "./new js/EngineRoom.js";
import { EngineRoomCorridor } from "./new js/EngineRoomCorridor.js";
import { MainMenu } from "./new js/MainMenu.js";
import HUD from "./HUD.js";
import PlayVideo from "./new js/PlayVideo.js";

//setSceneIndex(0);


let engineRoom = new EngineRoom(engine, scene);
let engineRoomScene = engineRoom.CreateScene(engine);

let playVideo = new PlayVideo(engine, scene);
let play = playVideo.createScene("../../../root/assets/scenes/opening_cutscene_first_draft.mp4", engine, scene);

let mainMenu = new MainMenu(engine, scene);
let mainMenuScene = mainMenu.CreateScene(engine);

let engineRoomCorridor = new EngineRoomCorridor(engine, scene);
let engineRoomCorridorScene = engineRoomCorridor.CreateScene(engine);

let hud = new HUD(engine, scene);
let hudScene = hud.CreateScene(engine);

//let gui = guiScene(engine);
hudScene.autoClear = false;
engine.runRenderLoop(() => {
    switch (sceneIndex) {
        case 0:
            mainMenuScene.render();
            break;
        case 1:
            play.render();
            break;
        case 2:
            engineRoomScene.render();
            hudScene.render();
            break;
        case 3:
            engineRoomCorridorScene.render();
            hudScene.render();
            break;
    }
    //gui.render();
});

/*******************************************************
 *  YOU SHOULDN'T NEED TO ADD ANY ADDITIONAL CODE HERE  *
 ********************************************************/
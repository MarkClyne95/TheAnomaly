//import guiScene  from "./guiScene.js";
import { scenes, scene, engine, setSceneIndex, sceneIndex } from "./createScenes.js";
import EngineRoom from "./new js/EngineRoom.js";
import EngineRoomCorridor from "./new js/EngineRoomCorridor.js";
import MainMenu from "./new js/MainMenu.js";

//setSceneIndex(0);

let engineRoom = new EngineRoom(engine, scene);
let engineRoomScene = engineRoom.CreateScene(engine);

let mainMenu = new MainMenu(engine, scene);
let mainMenuScene = mainMenu.CreateScene(engine);

let engineRoomCorridor = new EngineRoomCorridor(engine, scene);
let engineRoomCorridorScene = engineRoomCorridor.CreateScene(engine);

//let gui = guiScene(engine);
//gui.autoClear = false;
engine.runRenderLoop(() => {
    switch (sceneIndex) {
        case 0:
            mainMenuScene.render();
            break;

        case 1:
            engineRoomScene.render();
            break;

        case 2:
            engineRoomCorridorScene.render();
            break;
    }
    //gui.render();
});

/*******************************************************
 *  YOU SHOULDN'T NEED TO ADD ANY ADDITIONAL CODE HERE  *
 ********************************************************/
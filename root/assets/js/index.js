//import guiScene  from "./guiScene.js";
import { scenes, scene, engine, setSceneIndex, sceneIndex } from "./createScenes.js";
import EngineRoom from "./new js/EngineRoom.js";
import MainMenu from "./new js/MainMenu.js";

//setSceneIndex(0);

let engineRoom = new EngineRoom(engine, scene);
let engineRoomScene = engineRoom.CreateScene(engine);

let mainMenu = new MainMenu();
let mainMenuScene = mainMenu.CreateScene(engine);

//let gui = guiScene(engine);
//gui.autoClear = false;
engine.runRenderLoop(() => {
    switch (sceneIndex) {
        case 0:
            //scene.dispose();
            console.log(sceneIndex);
            mainMenuScene.render();
            break;

        case 1:
            //scene.dispose();
            console.log(sceneIndex);
            engineRoomScene.render();
            break;
    }
    //gui.render();
});

/*******************************************************
 *  YOU SHOULDN'T NEED TO ADD ANY ADDITIONAL CODE HERE  *
 ********************************************************/
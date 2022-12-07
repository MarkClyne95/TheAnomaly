import { sceneIndex } from "./createScenes.js";
let battery;
let crosschair;
let textbox;
let textbox2;
let advancedTexture;

export function engineRoomText() {
    textbox = new BABYLON.GUI.Image(
      "Text",
      "../../../BJS Editor/scenes/EngineRoom/textures/EngineRoom.png"
    );
    textbox.width = "400px";
    textbox.height = "100px";
    textbox.left = -600;
    textbox.top = -400;
    textbox.color = "transparent";
    advancedTexture.addControl(textbox);
}

export function engineRoomCorridorText() {
    console.log("I suck");
    textbox.dispose();
    textbox2 = new BABYLON.GUI.Image(
      "Text",
      "../../../BJS Editor/scenes/EngineRoom/textures/EngineRoomCorridor.png"
    );
    textbox2.width = "400px";
    textbox2.height = "150px";
    textbox2.left = -600;
    textbox2.top = -400;
    textbox2.color = "transparent";
    advancedTexture.addControl(textbox2);
}

export default class HUD {
  constructor(engine, scene) {
    this.scene = scene;
    this.engine = engine;
  }

  CreateScene(engine) {
    let scene = new BABYLON.Scene(engine);

    this.camera = this.CreateCamera(scene);
    this.gui = this.CreateGUI(scene);

    return scene;
  }

  CreateCamera(scene) {
    // Parameters : name, position, scene
    var camera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(0, 0, -10),
      scene
    );

    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    //camera.attachControl(true);
    return camera;
  }

  CreateGUI(scene) {
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true
    );

    battery = new BABYLON.GUI.Image(
      "greenBat",
      "../../../BJS Editor/scenes/EngineRoom/textures/Battery.png"
    );
    battery.width = "100px";
    battery.height = "100px";
    battery.top = -400;
    battery.left = 600;
    battery.color = "transparent";
    advancedTexture.addControl(battery);

    crosschair = new BABYLON.GUI.Image(
      "b1",
      "../../../BJS Editor/scenes/EngineRoom/textures/pngfind.com-crosshair-dot-png-5191877.png"
    );
    //crosschair.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    crosschair.width = "48px";
    crosschair.height = "48px";
    crosschair.color = "transparent";
    advancedTexture.addControl(crosschair);

    return advancedTexture;
  }

  SceneStart() {}
}

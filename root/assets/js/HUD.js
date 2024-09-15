import { sceneIndex } from "./createScenes.js";
let battery;
let crosschair;
let batteryCount;
let hasMultitool;
let textbox;
let textbox2;
let textbox3;
let textbox4;
let advancedTexture;

export function engineRoomText() {
    textbox = new BABYLON.GUI.Image(
        "Text",
        "./texture/EngineRoom.png"
    );
    textbox.width = "400px";
    textbox.height = "100px";
    textbox.left = -600;
    textbox.top = -400;
    textbox.color = "transparent";
    advancedTexture.addControl(textbox);
}

export function engineRoomCorridorText() {
    textbox.dispose();
    textbox2 = new BABYLON.GUI.Image(
        "Text",
        "./texture/EngineRoomCorridor.png"
    );
    textbox2.width = "400px";
    textbox2.height = "150px";
    textbox2.left = -600;
    textbox2.top = -400;
    textbox2.color = "transparent";
    advancedTexture.addControl(textbox2);
}

export function UpdateBatteryCount(amount) {
    textbox3.text = `x${amount}`;
    textbox3.fontSize = 24;
    advancedTexture.addControl(textbox3);
}

export function ChangeOnscreenText(text, enabled) {
    textbox4.text = text;
    textbox4.fontSize = 46;
    advancedTexture.addControl(textbox4);
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

        //battery
        battery = new BABYLON.GUI.Image(
            "greenBat",
            "./texture/Battery.png"
        );
        battery.width = "100px";
        battery.height = "100px";
        battery.top = -400;
        battery.left = 600;
        battery.color = "transparent";
        advancedTexture.addControl(battery);

        batteryCount = new BABYLON.GUI.Image("battery", "./texture/BatteryIndicator.png");

        batteryCount.width = "100px";
        batteryCount.height = "100px";
        batteryCount.top = -400;
        batteryCount.left = 300;
        batteryCount.color = "transparent";
        advancedTexture.addControl(batteryCount);

        textbox3 = new BABYLON.GUI.TextBlock();
        textbox3.color = "green";
        textbox3.outlineWidth = 5;
        textbox3.outlineColor = "black";
        textbox3.left = 350;
        textbox3.top = -400;

        textbox4 = new BABYLON.GUI.TextBlock();
        textbox4.color = "green";
        textbox4.outlineWidth = 5;
        textbox4.outlineColor = "black";
        textbox4.left = 0;
        textbox4.top = 100;

        //multitool
        hasMultitool = new BABYLON.GUI.Image("mt", "./texture/Multitool.png");
        hasMultitool.width = "100px";
        hasMultitool.height = "100px";
        hasMultitool.top = -400;
        hasMultitool.left = 250;
        hasMultitool.color = "transparent";
        advancedTexture.addControl(hasMultitool);

        let HUDMt = new BABYLON.GUI.Image('playerMtSprite', "./texture/HUDMultitool.png");
        HUDMt.width = "350px";
        HUDMt.height = "400px";
        HUDMt.top = 450;
        HUDMt.color = "transparent";
        advancedTexture.addControl(HUDMt);

        //crosshair
        crosschair = new BABYLON.GUI.Image(
            "b1",
            "./texture/pngfind.com-crosshair-dot-png-5191877.png"
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

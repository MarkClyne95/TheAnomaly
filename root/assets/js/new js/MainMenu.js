import { canvas, setSceneIndex, sceneIndex } from "../createScenes.js";
import { Player } from '../player.js';
import LoadSave from './LoadSave.js';

let camera;
let scene;
let engine;
let hemiLight;
let bgSphere;
let gui;
let video;
let music;
let selectSFX;

let savesys = new LoadSave();

export class MainMenu {
    constructor(engine, scene) {
        this.scene = scene;
        this.engine = engine;
    }



    CreateScene(engine) {
        let scene = new BABYLON.Scene(engine);
        this.camera = this.CreateCamera(scene);
        this.hemiLight = this.CreateLighting(scene);
        this.bgSphere = this.CreateBG(scene);

        selectSFX = new BABYLON.Sound("select", "./audio/SelectNoise.mp3", scene);
        selectSFX.setVolume(1);

        scene.debugLayer.show();

        this.music = this.CreateMusic(scene);
        this.gui = this.CreateGUI(scene, music);
        return scene;
    }

    CreateCamera(scene) {
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        //camera.attachControl(true); // YOU CANNOT ATTACHCONTROL TO CAMERA WITH MULTIPLE SCENES
        return camera;
    }

    CreateLighting(scene) {
        //Add a light(s) to the Scene
        var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 0, 0);
        return light;
    }

    CreateBG(scene) {
        var skybox = BABYLON.MeshBuilder.CreateSphere("skyBox", { diameter: 100, sideOrientation: 2 }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        //skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../../../../root/assets/texture/Standard-Cube-Map/", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        skybox.infiniteDistance = true;

        return skybox;
    }

    CreateGUI(scene, music) {
        let advancedTexture =
            BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

        let titleImg = new BABYLON.GUI.Image("Title", "./texture/Title.png");
        titleImg.width = 0.4;
        titleImg.height = 0.4;
        titleImg.top = -290;
        advancedTexture.addControl(titleImg);

        let creditImg = new BABYLON.GUI.Image(
            "Credit",
            "./texture/Credit.png"
        );
        creditImg.width = 0.2;
        creditImg.height = 0.1;
        creditImg.top = 375;
        creditImg.left = 750;
        advancedTexture.addControl(creditImg);

        let beginImg = new BABYLON.GUI.Image(
            "Begin",
            "./texture/Begin.png"
        );
        beginImg.width = 0.4;
        beginImg.height = 0.125;
        beginImg.top = 100;

        beginImg.onPointerEnterObservable.add(function() {
            selectSFX.play();
        });

        beginImg.onPointerUpObservable.add(function() {
            music.dispose();
            var player = new Player(0, 0, 0, false, false);
            savesys.SaveGame(player);
            setSceneIndex(1);
            advancedTexture.dispose();

        });
        advancedTexture.addControl(beginImg);

    }



    CreateMusic(scene) {
        music = new BABYLON.Sound("Music", "./audio/reverse.mp3", scene, null, {
            loop: true,
            autoplay: true
        });

        music.setVolume(.1);
        return music
    }



    SceneStart() {}

}
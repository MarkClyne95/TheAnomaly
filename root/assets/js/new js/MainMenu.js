import { canvas, setSceneIndex, sceneIndex } from "../createScenes.js";
import { Player } from '../player.js';
import LoadSave from './LoadSave.js';

let camera;
let scene;
let engine;
let hemiLight;
let bgSphere;
let gui;
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

        this.music = this.CreateMusic(scene);
        this.gui = this.CreateGUI(scene, music);

        return scene;
    }

    CreateCamera(scene) {
        let camAlpha = -Math.PI / 2;
        let camBeta = Math.PI / 2.5;
        let camDist = 15;
        let camTarget = new BABYLON.Vector3(0, 0, 0);
        let camera = new BABYLON.ArcRotateCamera(
            "camera1",
            camAlpha,
            camBeta,
            camDist,
            camTarget,
            scene
        );
        //camera.attachControl(true); // YOU CANNOT ATTACHCONTROL TO CAMERA WITH MULTIPLE SCENES
        return camera;
    }

    CreateLighting(scene) {
        //Add a light(s) to the Scene
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(-1, 1, 0),
            scene
        );

        light.intensity = 1;
        return light;
    }

    CreateBG(scene) {
        let hdrTexture = new BABYLON.HDRCubeTexture(
            "./texture/CosmicCoolCloudBack.hdr",
            scene,
            512
        );
        let sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 4, scene);
        let sphereMtl = new BABYLON.PBRMaterial("sphereMtl", scene);
        sphereMtl.reflectionTexture = hdrTexture;
        sphereMtl.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        sphereMtl.disableLighting = true;
        sphereMtl.backFaceCulling = false;
        sphere.material = sphereMtl;

        sphere.scaling = new BABYLON.Vector3(10, 10, 10);

        scene.registerBeforeRender(function() {
            sphere.rotation.z += 0.0001 * scene.deltaTime;
        });

        return sphere;
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
        beginImg.top = 0;

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

        let settingsImg = new BABYLON.GUI.Image(
            "Settings",
            "./texture/Settings.png"
        );
        settingsImg.width = 0.4;
        settingsImg.height = 0.125;
        settingsImg.top = 150;

        settingsImg.onPointerEnterObservable.add(function() {
            selectSFX.play();
            //alert("I am totally a settings screen");
        });
        advancedTexture.addControl(settingsImg);
    }



    CreateMusic(scene) {
        music = new BABYLON.Sound("Music", "./audio/e s c p - - Cyber Crime Story.mp3", scene, null, {
            loop: true,
            autoplay: true
        });

        music.setVolume(.1);
        return music
    }



    SceneStart() {}

}
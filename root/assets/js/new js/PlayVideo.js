import { canvas, setSceneIndex, sceneIndex } from "../createScenes.js";

let scene;
let engine;
let played = false;

export default class PlayVideo {
    constructor(engine, scene) {
        this.scene = scene;
        this.engine = engine;
    }

    createScene(videoUrl, video2, engine, scene) {

        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("arcR", -Math.PI / 2, Math.PI / 2, 800, BABYLON.Vector3.Zero(), scene);



        scene.registerAfterRender(() => {
            if (!played) {
                played = true;
                this.PVideo(scene, engine, videoUrl, video2);
            }
        })

        //console.log(ANote0Video);
        return scene;
    };

    PVideo(scene, engine, v1, v2) {
        var planeOpts = {
            height: 1080,
            width: 1920,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        };
        var ANote0Video = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
        var vidPos = (new BABYLON.Vector3(0, 0, 0.1))
        ANote0Video.position = vidPos;
        var ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
        var ANote0VideoVidTex = new BABYLON.VideoTexture("vidtex", v1, scene);
        ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
        ANote0VideoMat.roughness = 1;
        ANote0VideoMat.emissiveColor = new BABYLON.Color3.White();
        ANote0Video.material = ANote0VideoMat;
        ANote0VideoVidTex.video.loop = false;

        ANote0VideoVidTex.video.addEventListener('play', (event) => {
            switch (sceneIndex) {
                case 1:
                    ANote0VideoVidTex = new BABYLON.VideoTexture("vidtex", v1, scene);
                    break;
                case 4:
                    ANote0VideoVidTex = new BABYLON.VideoTexture("vidtex", v2, scene);
                    break;
            }
        })


        ANote0VideoVidTex.video.addEventListener('ended', (event) => {
            switch (sceneIndex) {
                case 1:
                    ANote0VideoVidTex.dispose();
                    setSceneIndex(2)
                    scene.onPointerDown = null;
                    break;
                case 4:
                    location.reload();
                    scene.onPointerDown = null;
                    break;
            }
        })
    }
}
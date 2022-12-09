import { Player } from "../player.js";
import { ChangeOnscreenText } from "../HUD.js";
import { canvas, setSceneIndex, sceneIndex } from "../createScenes.js";

let camera;
let scene;
let engine;
let hemiLight;
let actionManager;
let firstDoorFlag = false;
let player;
let sound;
let music;
let played = false;

export class EngineRoom {
    constructor(engine, scene) {
        this.scene = scene;
        this.engine = engine;
    }

    CreateScene(engine) {
        let scene = new BABYLON.Scene(engine);

        this.camera = this.CreateCamera(scene);
        this.hemiLight = this.CreateLighting();
        this.CreateActionManager(scene);
        this.CreateControls(scene, camera);
        this.AppendScene(scene);
        this.music = this.CreateMusic(scene);

        sound = new BABYLON.Sound("zap", "../../../../root/assets/audio/Zap.mp3", scene, null, {
            loop: false,
            autoplay: false
        });

        scene.registerAfterRender(() => {
            this.CheckItem(scene, camera);
            if (!played) {
                played = true;
                this.music.play();
            }
        })

        return scene;
    }

    CreateCamera(scene) {
        var camera = new BABYLON.FreeCamera(
            "FreeCamera",
            new BABYLON.Vector3(0, 10, 0),
            scene
        );

        player = new Player(0, 0, 0, false, false);

        camera.speed = 6;
        camera.fov = 0.6;
        camera.inertia = 0.0;
        camera.attachControl(canvas, true);

        //Set the ellipsoid around the camera (e.g. your player's size)
        camera.ellipsoid = new BABYLON.Vector3(1, 4, 1);

        camera.isPickable = false;
        camera.applyGravity = true;
        camera.enablePhysics = true;
        camera.checkCollisions = true;

        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysRight.push(68);
        camera.keysLeft.push(65);
        return camera;
    }

    CreateLighting() {
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(1, 1, 0)
        );

        return light;
    }

    CreateActionManager(scene) {
        // Keyboard events
        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyDownTrigger,
                function(evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }
            )
        );
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyUpTrigger,
                function(evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }
            )
        );
    }

    AppendScene(scene) {
        BABYLON.SceneLoader.Append(
            "../../../root/assets/scenes/",
            "scene.babylon",
            scene,
            (newMeshes) => {
                var meshes = newMeshes.meshes;
                meshArr = meshes;
                meshes.forEach((item) => {
                    item.enablePhysics = true;
                    item.isPickable = false;
                    item.physicsImpostor = new BABYLON.PhysicsImpostor(
                        item,
                        BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 },
                        scene
                    );

                    item.receiveShadows = true;
                });
            }
        );
    }

    CreateControls(scene, camera) {
        //Controls...Mouse
        //We start without being locked.
        var isLocked = false;

        // On click event, request pointer lock
        scene.onPointerDown = function(evt) {
            //true/false check if we're locked, faster than checking pointerlock on each single click.
            if (!isLocked) {
                canvas.requestPointerLock =
                    canvas.requestPointerLock ||
                    canvas.msRequestPointerLock ||
                    canvas.mozRequestPointerLock ||
                    canvas.webkitRequestPointerLock;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }
        };

        // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
        var pointerlockchange = function() {
            var controlEnabled =
                document.mozPointerLockElement ||
                document.webkitPointerLockElement ||
                document.msPointerLockElement ||
                document.pointerLockElement ||
                null;

            // If the user is already locked
            if (!controlEnabled) {
                //camera.detachControl(canvas);
                isLocked = false;
            } else {
                //camera.attachControl(canvas);
                isLocked = true;
            }
        };

        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case "Shift":
                            this.camera.speed = 12;
                            break;
                        case "e":
                            console.log("Am hit");
                            let doRaycast = this.CreateRaycast(scene, camera);
                            break;
                    }
                    break;

                case BABYLON.KeyboardEventTypes.KEYUP:
                    switch (kbInfo.event.key) {
                        case "Shift":
                            this.camera.speed = 6;
                            break;
                    }
                    break;
            }
        });

        // Attach events to the document
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener(
            "webkitpointerlockchange",
            pointerlockchange,
            false
        );
    }

    VectorToLocal(vector, mesh) {
        let m = BABYLON.Matrix.Identity();
        let v = BABYLON.Vector3.TransformCoordinates(vector, m);
        return v;
    }

    CreateRaycast(scene, camera) {
        let origin = new BABYLON.Vector3(
            this.camera.position.x,
            10,
            this.camera.position.z
        );

        let forward = new BABYLON.Vector3(0, 0, 1);
        forward = this.VectorToLocal(forward, camera);

        let direction = this.camera.getDirection(new BABYLON.Vector3.Forward());

        let length = 10;

        let ray = new BABYLON.Ray(origin, direction, length);

        let hit = scene.pickWithRay(ray);

        console.log(hit.pickedMesh.name);

        if (hit.pickedMesh.name == "Model::SM_Terminal_A") {
            sound.play();
            player.firstDoorFlag = true;
            console.log(player.firstDoorFlag);
        }

        if (
            (hit.pickedMesh.name === "Scanner" ||
                hit.pickedMesh.name === "ExitScanner" ||
                hit.pickedMesh.name === "BlueScreen" ||
                hit.pickedMesh.name === "RedScreen") &&
            player.firstDoorFlag == true
        ) {
            this.music.dispose();
            sound.play();
            setSceneIndex(3);
            scene.dispose();
        }


    }

    CheckItem(scene, camera) {
        let origin = new BABYLON.Vector3(
            this.camera.position.x,
            this.camera.position.y,
            this.camera.position.z
        );

        let forward = new BABYLON.Vector3(0, 0, 1);
        forward = this.VectorToLocal(forward, camera);

        let direction = this.camera.getDirection(new BABYLON.Vector3.Forward());

        let length = 1000;

        let ray = new BABYLON.Ray(origin, direction, length);

        let hit = scene.pickWithRay(ray);

        switch (hit.pickedMesh.name) {
            case "Scanner":
            case "ExitScanner":
            case "BlueScreen":
            case "RedScreen":
                ChangeOnscreenText("Press E to Proceed", true);
                break;
            case "Model::SM_Terminal_A":
                ChangeOnscreenText("Press E to fix the engines", true);
                break;

            default:
                ChangeOnscreenText("", true);
        }

    }

    CreateMusic(scene) {
        music = new BABYLON.Sound("Music", "./audio/e s c p - - Cyber Crime Storydp.mp3", scene, null, {
            loop: true,
            autoplay: false
        });

        music.setVolume(.1);
        return music
    }

    SceneStart() {}
}
import { Player } from '../player.js';
import { canvas, setSceneIndex, sceneIndex } from "../createScenes.js";

let camera;
let scene;
let engine;
let hemiLight;
let actionManager;

export default class EngineRoom {
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

        return scene;
    }

    CreateCamera(scene) {
        var camera = new BABYLON.FreeCamera(
            "FreeCamera",
            new BABYLON.Vector3(0, 10, 0),
            scene
        );

        var player = new Player();

        console.log(`${player.name}, ${player.getAnxietyMeter}`);
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
                            console.log(scanner);
                            break;

                        case "e":
                            console.log("Am hit");
                            let doRaycast = CreateRaycast(scene, camera);
                            break;
                        case "f":
                            setSceneIndex(2);
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
        var advancedTexture =
            BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Ui");
        var crosschair = BABYLON.GUI.Button.CreateImageOnlyButton(
            "b1",
            "../../../BJS Editor/scenes/EngineRoom/textures/pngfind.com-crosshair-dot-png-5191877.png"
        );
        crosschair.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
        crosschair.width = "48px";
        crosschair.height = "48px";
        crosschair.color = "transparent";
        advancedTexture.addControl(crosschair);

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
        let origin = camera.position;

        let forward = new BABYLON.Vector3(0, 0, 1);
        forward = vecToLocal(forward, camera);

        let direction = forward.subtract(origin);
        direction = BABYLON.Vector3.Normalize(direction);

        let length = 10;

        let ray = new BABYLON.Ray(origin, direction, length);

        let rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(scene);

        let hit = scene.pickWithRay(ray);

        if (hit.pickedMesh) {
            if (hit.pickedMesh.name === 'ExitScanner') {
                hit.pickedMesh.scaling.y += 1;
                console.log(hit.pickedMesh);
            }
        }
    }

    SceneStart() {}

}
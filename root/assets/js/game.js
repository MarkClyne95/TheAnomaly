import '../../../node_modules/@babylonjs/core/Legacy/legacy.js';
import '../../../node_modules/babylonjs-loaders/babylon.glTF2FileLoader.js';

var canvas = document.getElementById("renderCanvas")
var engine = new BABYLON.Engine(canvas, true);
const createScene = function() {
    const scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(-2, 2, -2), scene);
    camera.fov = 0.6;
    camera.inertia = 0.0;
    camera.attachControl(canvas, true);

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

    scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());

    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 2, 1);

    var skeleton = null;

    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.keysLeft.push(65);


    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // Keyboard events
    var inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    BABYLON.SceneLoader.Append("../Unity Export/scenes/", "TestScene.gltf", scene, (newMeshes) => {
        var meshes = newMeshes.meshes;
        meshes.forEach(item => {
            item.checkCollisions = true;
        });
    });

    //Controls...Mouse
    //We start without being locked.
    var isLocked = false;

    // On click event, request pointer lock
    scene.onPointerDown = function(evt) {

        //true/false check if we're locked, faster than checking pointerlock on each single click.
        if (!isLocked) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }

    };


    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function() {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;

        // If the user is already locked
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            isLocked = false;
        } else {
            //camera.attachControl(canvas);
            isLocked = true;
        }
    };

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    scene.debugLayer.show();
    return scene;
};


var scene = createScene();
engine.runRenderLoop(function() {
    scene.render();
});
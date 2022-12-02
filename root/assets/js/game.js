import {canvas}        from "./createScenes.js";

function createCamera(scene) {
  var camera = new BABYLON.FreeCamera(
    "FreeCamera",
    new BABYLON.Vector3(0, 10, 0),
    scene
  );
  camera.fov = 0.6;
  camera.inertia = 0.0;
  camera.attachControl(canvas, true);
  
  //Set the ellipsoid around the camera (e.g. your player's size)
  camera.ellipsoid = new BABYLON.Vector3(1, 4, 1);

  camera.enablePhysics = true;
  camera.checkCollisions = true;

  var skeleton = null;

  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysRight.push(68);
  camera.keysLeft.push(65);

  return camera;
}

function createLight(scene) {
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  return light;
}

function createActionManager(scene) {
  // Keyboard events
  var inputMap = {};
  scene.actionManager = new BABYLON.ActionManager(scene);
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyDownTrigger,
      function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
      }
    )
  );
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyUpTrigger,
      function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
      }
    )
  );
}

function appendScene(scene) {
  BABYLON.SceneLoader.Append(
    "../../../BJS Editor/assets/EngineRoom/",
    "scene.babylon",
    scene,
    (newMeshes) => {
      var meshes = newMeshes.meshes;
      meshes.forEach((item) => {
        item.physicsImpostor = new BABYLON.PhysicsImpostor(
          ground,
          BABYLON.PhysicsImpostor.BoxImpostor,
          { mass: 0, restitution: 0.9 },
          scene
        );
      });
    }
  );
}

function createControls(scene, camera) {
  //Controls...Mouse
  //We start without being locked.
  var isLocked = false;

  // On click event, request pointer lock
  scene.onPointerDown = function (evt) {
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
  var pointerlockchange = function () {
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
            camera.speed = 12;
            break;
        }
        break;

      case BABYLON.KeyboardEventTypes.KEYUP:
        switch (kbInfo.event.key) {
          case "Shift":
            camera.speed = 6;
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

export default function createStartScene(engine) {
  let that = {};
  let scene = (that.scene = new BABYLON.Scene(engine));
  //scene.debugLayer.show();

  /********************************************************************
   * ANY CODE IN RELATION RENDERING ON THE SCREEN SHOULD GO BELOW HERE
   ********************************************************************/

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
  scene.collisionsEnabled = true;

  let light = (that.light = createLight(scene));
  let camera = (that.camera = createCamera(scene));
  let manager = (that.actionManager = createActionManager(scene));

  let append = (that.append = appendScene(scene));
  let controls = (that.controls = createControls(scene, camera));
  //let gui = (that.gui = createGUI(scene));

  //let bgSphere = (that.bgSphere = createBG(scene));

  //let music = (that.music = createMusic(scene));
  return that;
}

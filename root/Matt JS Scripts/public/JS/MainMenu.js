//import { title } from "process";

function createCamera(scene) {
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

function createLight(scene) {
  //Add a light(s) to the Scene
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(-1, 1, 0),
    scene
  );

  light.intensity = 1;
  return light;
}

function createBG(scene) {
  let hdrTexture = new BABYLON.HDRCubeTexture(
    "./assets/texture/CosmicCoolCloudBack.hdr",
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

  scene.registerBeforeRender(function () {
    sphere.rotation.z += 0.0001 * scene.deltaTime;
  });

  return sphere;
}

function createGUI(scene) {
  let advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  let titleImg = new BABYLON.GUI.Image("Title", "./assets/texture/Title.png");
  titleImg.width = 0.4;
  titleImg.height = 0.4;
  titleImg.top = -290;
  advancedTexture.addControl(titleImg);

  let creditImg = new BABYLON.GUI.Image(
    "Credit",
    "./assets/texture/Credit.png"
  );
  creditImg.width = 0.2;
  creditImg.height = 0.1;
  creditImg.top = 375;
  creditImg.left = 750;
  advancedTexture.addControl(creditImg);

  let beginImg = new BABYLON.GUI.Image(
    "Begin",
    "./assets/texture/Begin.png"
  );
  beginImg.width = 0.4;
  beginImg.height = 0.125;
  beginImg.top = 0;

  beginImg.onPointerUpObservable.add(function () {
    alert("Scene should change");
  });
  advancedTexture.addControl(beginImg);

  let settingsImg = new BABYLON.GUI.Image(
    "Settings",
    "./assets/texture/Settings.png"
  );
  settingsImg.width = 0.4;
  settingsImg.height = 0.125;
  settingsImg.top = 150;

  settingsImg.onPointerUpObservable.add(function () {
    alert("I am totally a settings screen");
  });
  advancedTexture.addControl(settingsImg);

}

function createMusic(scene){
  var music = new BABYLON.Sound("Music", "./assets/audio/e s c p - - Cyber Crime Story.mp3", scene, null, {
    loop: true,
    autoplay: true
  });

  music.setVolume(.1);
  return music
}

export default function createStartScene(engine) {
  let that = {};
  let scene = (that.scene = new BABYLON.Scene(engine));
  //scene.debugLayer.show();

  /********************************************************************
   * ANY CODE IN RELATION RENDERING ON THE SCREEN SHOULD GO BELOW HERE
   ********************************************************************/

  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  scene.collisionsEnabled = true;

  // Enable Collisions
  scene.collisionsEnabled = true;

  let light = (that.light = createLight(scene));
  let camera = (that.camera = createCamera(scene));
  let gui = (that.gui = createGUI(scene));

  let bgSphere = (that.bgSphere = createBG(scene));

  let music = (that.music = createMusic(scene));
  return that;
}

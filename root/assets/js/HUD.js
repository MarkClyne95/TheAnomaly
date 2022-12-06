let CreateScene = function () {
  let hudScene = new BABYLON.Scene();

  // Parameters : name, position, scene
  var camera = new BABYLON.UniversalCamera(
    "UniversalCamera",
    new BABYLON.Vector3(0, 0, -10),
    hudScene
  );

  // Targets the camera to a particular position. In this case the scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // Attach the camera to the canvas
  camera.attachControl(canvas, true);

  let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    true
  );

  var battery = new BABYLON.GUI.Image(
    "greenBat",
    "./textures/Battery.png"
  );
  battery.width = "100px";
  battery.height = "100px";
  battery.top = -300;
  battery.left = 600;
  battery.color = "transparent";
  advancedTexture.addControl(battery);

  var crosschair = new BABYLON.GUI.Image(
    "b1",
    "./textures/pngfind.com-crosshair-dot-png-5191877.png"
  );
  //crosschair.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
  crosschair.width = "48px";
  crosschair.height = "48px";
  crosschair.color = "transparent";
  advancedTexture.addControl(crosschair);

  return hudScene;
};

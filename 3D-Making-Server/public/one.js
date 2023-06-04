var createScene = function() {
  var scene = new BABYLON.Scene(engine);

  // Enable shadows in the scene
  scene.shadowsEnabled = true;
  var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  // Set camera's position and target
  camera.setPosition(new BABYLON.Vector3(0, 0, -10));
  camera.setTarget(BABYLON.Vector3.Zero());

  // Create a light source
  var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-1, -2, -1), scene);
  light.shadowEnabled = true;

  var trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", {diameterTop : 1, diameterBottom : 1, height : 5, tessellation1 : 24}, scene);
  trunk.position.y = 2.5; // Adjust the position of the trunk as needed

  var leaves = BABYLON.MeshBuilder.CreateSphere("leaves", { diameter: 4 }, scene);
  leaves.position.y = 6; // Adjust the position of the leaves as needed

  var trunkMaterial = new BABYLON.StandardMaterial("trunkMaterial", scene);
  trunkMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0); // Brown color for trunk

  var leavesMaterial = new BABYLON.StandardMaterial("leavesMaterial", scene);
  leavesMaterial.diffuseColor = new BABYLON.Color3(0, 0.8, 0); // Green color for leaves

  // Apply materials to trunk and leaves meshes
  trunk.material = trunkMaterial;
  leaves.material = leavesMaterial;

  var tree = BABYLON.Mesh.MergeMeshes([trunk, leaves], false, false, null, false);


  return scene;
};


// Get a reference to the canvas element
var canvas = document.getElementById("renderCanvas");

// Create the Babylon.js engine
var engine = new BABYLON.Engine(canvas, true);

// Create the scene
var scene = createScene(engine);

// Create a camera
// var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
// camera.attachControl(canvas, true);

// Create a light
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Render the scene
engine.runRenderLoop(function () {
    scene.render();
});

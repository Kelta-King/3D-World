// You have to create a function called createScene. This function must return a BABYLON.Scene object
// You can reference the following variables: scene, canvas
// You must at least define a camera

var createScene = function (engine) {
    //Scene

    var scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    scene.gravity = new BABYLON.Vector3(0, -.75, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));


    //Camera

    // Parameters : name, position, scene
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 2, -25), scene);

    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(.4, .8, .4);
    camera.checkCollisions = true;
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = Math.PI / 2.2;

    //Hero

    var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 2, diameterTop: 3, diameterBottom: 3 }, scene);

    // Create two half-spheres for the top and bottom ends of the capsule
    var topSphere = BABYLON.MeshBuilder.CreateSphere("topSphere", { diameter: 3 }, scene);
    var bottomSphere = BABYLON.MeshBuilder.CreateSphere("bottomSphere", { diameter: 3 }, scene);

    // Position the cylinder and spheres appropriately to form a capsule shape
    topSphere.position.y = 1;  // Position the top sphere half-way up the cylinder
    bottomSphere.position.y = -1;  // Position the bottom sphere half-way down the cylinder

    var hero = BABYLON.Mesh.MergeMeshes([cylinder, topSphere, bottomSphere], true);
    cylinder.dispose();
    topSphere.dispose();
    bottomSphere.dispose();
    hero.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, 0);
    // hero.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    //     Math.PI / 2, 0, 0 // Lock rotation along X and Z axes
    // );
    // var hero = BABYLON.Mesh.CreateBox('hero', 2.0, scene, false, BABYLON.Mesh.FRONTSIDE);
    hero.position.x = 0.0;
    hero.position.y = 1.0;
    hero.position.z = 0.0;
    hero.physicsImpostor = new BABYLON.PhysicsImpostor(hero, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.0, friction: 0.0 }, scene);
    hero.rotation.y = Math.PI;

    // pointer
    var pointer = BABYLON.Mesh.CreateSphere("Sphere", 16.0, 0.01, scene, false, BABYLON.Mesh.DOUBLESIDE);
    // move the sphere upward 1/2 of its height
    pointer.position.x = 190.0;
    pointer.position.y = 0.0;
    pointer.position.z = 0.0;
    pointer.isPickable = false;

    var moveForward = false;
    var moveBackward = false;
    var moveRight = false;
    var moveLeft = false;

    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                break;
        }
    };

    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    setInterval(() => {
        console.log(camera.position);
    }, 1000);


    scene.registerBeforeRender(function () {
        //Your code here
        //Step
        //let stats = document.getElementById("stats");
        //stats.innerHTML = "";             

        camera.position.x = hero.position.x ;
        camera.position.y = hero.position.y;
        camera.position.z = hero.position.z;
        pointer.position = camera.getTarget();


        var forward = camera.getTarget().subtract(camera.position).normalize();
        forward.y = 0;
        var right = BABYLON.Vector3.Cross(forward, camera.upVector).normalize();
        right.y = 0;

        var SPEED = 20;
        let f_speed = 0;
        var s_speed = 0;
        var u_speed = 0;

        if (moveForward) {
            f_speed = SPEED;
        }
        if (moveBackward) {
            f_speed = -SPEED;
        }

        if (moveRight) {
            s_speed = SPEED;
        }

        if (moveLeft) {
            s_speed = -SPEED;
        }

        var move = (forward.scale(f_speed)).subtract((right.scale(s_speed))).subtract(camera.upVector.scale(u_speed));
        // scene.getPhysicsEngine().runOneStep();

        // Update hero position
        // hero.position = hero.physicsImpostor.getLinearVelocity().scale(0.01).add(hero.position);
        hero.physicsImpostor.physicsBody.velocity.x = move.x;
        hero.physicsImpostor.physicsBody.velocity.z = move.z;
        hero.physicsImpostor.physicsBody.velocity.y = move.y;

    });

    /*//WASD
    camera.keysUp.push(87); 
    camera.keysDown.push(83);            
    camera.keysRight.push(68);
    camera.keysLeft.push(65);
    */


    //Jump
    /* function jump(){
       hero.physicsImpostor.applyImpulse(new BABYLON.Vector3(1, 20, -1), hero.getAbsolutePosition());
     }
 
     document.body.onkeyup = function(e){
       if(e.keyCode == 32){
         //your code
         console.log("jump");
         setTimeout(jump(), 10000); 
 
       }
     }*/

    //Mouse
    //We start without being locked.
    var isLocked = false;

    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {

        //true/false check if we're locked, faster than checking pointerlock on each single click.
        if (!isLocked) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }

        //continue with shooting requests or whatever :P
        //evt === 1 (mouse wheel click (not scrolling))
        //evt === 2 (right mouse click)
    };


    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function () {
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

    //Geometry
    //Material
    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    myMaterial.diffuseTexture = new BABYLON.Texture("wall1.png");
    // myMaterial.diffuseTexture.uScale = 1; // Scale in the U direction
    // myMaterial.diffuseTexture.vScale = 1; // Scale in the V direction
    // myMaterial.diffuseTexture.uOffset = 0; // Offset in the U direction
    // myMaterial.diffuseTexture.vOffset = 0;
    // myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // myMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
    // myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    // Sky
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:450}, scene);
	const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;

    //Ground 
    var myGround = BABYLON.MeshBuilder.CreateGround("myGround", {width: 150, height: 150, subdivsions: 4}, scene);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("ground.png", scene);
    myGround.material = groundMaterial;
    myGround.position.y = -1;
    myGround.checkCollisions = true;
    myGround.physicsImpostor = new BABYLON.PhysicsImpostor(myGround, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.1 }, scene);

    // Box
    // Create a building cube
    var wall1 = BABYLON.MeshBuilder.CreateBox("building", { width: 140, height: 10, depth: 10 }, scene);
    wall1.material = myMaterial;
    wall1.isPickable = true;
    wall1.rotation.y = Math.PI;
    wall1.position.x = -9.8198819336906666
    wall1.position.y = 4.25;
    wall1.position.z = -65.63999237061624;
    wall1.checkCollisions = true;
    wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);

    // const faceUV = new Array(6);
    // for (let i = 0; i < 6; i++) {
    //     faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
    // }
    // faceUV[1] = new BABYLON.Vector4(0, 0, 1, 1);
    // const boxOption = {
    //     faceUV: faceUV
    // }
    // var screenBody = BABYLON.MeshBuilder.CreateBox("sBody1", {width:16, height: 9, depth: 0.5, faceUV: faceUV}, scene);
    // screenBody.position.x = 10;
    // screenBody.position.y = 3;
    // screenBody.position.z = 3;
    // // var screen1 = BABYLON.MeshBuilder.CreatePlane("plane", { width: 15, height: 8.5 }, scene);
    // var videoTexture = new BABYLON.VideoTexture("videoTexture", "bear.mp4", scene, true, true);
    // videoTexture.vScale = -1;
    // screenBody.material = new BABYLON.StandardMaterial("planeMaterial", scene);
    // screenBody.material.diffuseTexture = videoTexture;
    // screenBody.material.roughness = 1;
    
    // Apply the video texture to the plane
    // screen1.material = new BABYLON.StandardMaterial("planeMaterial", scene);
    // screen1.material.diffuseTexture = videoTexture;
    // screen1.material.roughness = 1;
    // screen1.material.emissiveColor = new BABYLON.Color3.White();

    // screen1.position.x = 10;
    // screen1.position.y = 3;
    // screen1.position.z = 10;
    
    
    // BABYLON.SceneLoader.ImportMeshAsync("", "", "building2/building.obj").then(function (result) {
    //     // Retrieve the loaded meshes from the result object
    //     var meshes = result.meshes;

    //     // Do additional operations on the loaded model, if needed
    //     meshes.forEach(function (mesh) {
    //         mesh.position = new BABYLON.Vector3(14, 0, 14);
    //         mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.ConvexHullImpostor, { mass: 100, restitution: 0.5 }, scene);
    //     });
    //     // Example: Enable shadows for the loaded model
    //     meshes.forEach(function (mesh) {
    //         mesh.receiveShadows = true;
    //         mesh.castShadows = true;
    //     });
    // });
    
    
    // var building = BABYLON.MeshBuilder.CreateBox("building", { width: 4, height: 6, depth: 4 }, scene);
    // building.position.x = 0;
    // building.position.z = 0;
    // building.position.y = 3; // Adjust the position of the cube

    // Enable collisions and set the cube as not movable
    // building.checkCollisions = true;
    // building.isPickable = false;
    // building.physicsImpostor = new BABYLON.PhysicsImpostor(building, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);

    // // Disable collisions for the player's camera
    // camera.checkCollisions = true;
    // camera.applyGravity = true;
    // camera.ellipsoid = new BABYLON.Vector3(1, 1, 1); // Adjust the ellipsoid size to fit your player

    // // Register collisions between the player and the building
    // scene.registerBeforeRender(function () {
    //     if (camera.intersectsMesh(building, true)) {
    //         // Get the intersection point between the player and the building
    //         var intersectionPoint = camera.position.clone();
    
    //         // Calculate the direction vector from the player's position to the intersection point
    //         var direction = intersectionPoint.subtract(camera.position);
    //         direction.y = 0; // Ignore the vertical component of the direction
    
    //         // Normalize the direction vector
    //         direction.normalize();
    
    //         // Calculate the new position where the player should be moved to avoid the collision
    //         var newPosition = camera.position.add(direction.multiplyByFloats(deltaTime, deltaTime, deltaTime));
    
    //         // Set the new position for the player's camera
    //         camera.position.copyFrom(newPosition);
    //     }
    // });


    // Border
    var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
  border0.scaling = new BABYLON.Vector3(5, 100, 150);
  border0.position.x = -75.0;
  border0.checkCollisions = true;
  border0.isVisible = false;

  var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
  border1.scaling = new BABYLON.Vector3(5, 100, 150);
  border1.position.x = 75.0;
  border1.checkCollisions = true;
  border1.isVisible = false;

  var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
  border2.scaling = new BABYLON.Vector3(150, 100, 5);
  border2.position.z = 75.0;
  border2.checkCollisions = true;
  border2.isVisible = false;

  var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
  border3.scaling = new BABYLON.Vector3(150, 100, 5);
  border3.position.z = -75.0;
  border3.checkCollisions = true;
  border3.isVisible = false;

  border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    //Atmosphere

    //Light
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(60, 60, 0), scene);
    var gl = new BABYLON.GlowLayer("sphere", scene);
    light1.intensity = 0.5;
    light2.intensity = .5;

    //Ball punch
    window.addEventListener("click", function () {
        var pickResult = scene.pick(scene.pointerX, scene.pointerY)

        if (pickResult.hit) {
            var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
            dir.normalize();
            pickResult.pickedMesh.applyImpulse(dir.scale(150), pickResult.pickedPoint);
        }
    });



    //fog
    //skybox










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

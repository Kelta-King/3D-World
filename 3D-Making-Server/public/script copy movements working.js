var HOST_ENDPOINT = "ws://localhost:2567";
var ROOM_NAME = "my_room";
// var scriptUrl = "https://unpkg.com/colyseus.js@^0.15.0-preview.2/dist/colyseus.js";

// Base of the world
function createBase(){
    // Sky
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 450 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    //Ground 
    var myGround = BABYLON.MeshBuilder.CreateGround("myGround", { width: 150, height: 150, subdivsions: 4 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("ground.png", scene);
    myGround.material = groundMaterial;
    myGround.position.y = -1;
    myGround.checkCollisions = true;
    myGround.physicsImpostor = new BABYLON.PhysicsImpostor(myGround, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.1 }, scene);

}

// Still objects functions
function createWallHouse() {
    var wallHouseMaterial = new BABYLON.StandardMaterial("wallHouseMaterial", scene);
    wallHouseMaterial.diffuseTexture = new BABYLON.Texture("wall1.png");

    var wallHouse = BABYLON.MeshBuilder.CreateBox("building", { width: 140, height: 10, depth: 10 }, scene);
    wallHouse.material = wallHouseMaterial;
    wallHouse.isPickable = true;
    wallHouse.rotation.y = Math.PI;
    wallHouse.position.x = -9.8198819336906666
    wallHouse.position.y = 4.25;
    wallHouse.position.z = -65.63999237061624;
    wallHouse.checkCollisions = true;
    wallHouse.physicsImpostor = new BABYLON.PhysicsImpostor(wallHouse, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);
}

function createBank() {
    var bankMaterial = new BABYLON.StandardMaterial("bankMaterial", scene);
    bankMaterial.diffuseTexture = new BABYLON.Texture("bank.png");

    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.3, 0.0, 0.6, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.3, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.6, 0, 0.8, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.6, 0, 0.8, 1.0); //new BABYLON.Vector4(0.8, 0, 1, 1.0); //left side
    var bank = BABYLON.MeshBuilder.CreateBox("building", { width: 60, height: 50, depth: 10, faceUV: faceUV, wrap: true }, scene);
    bank.material = bankMaterial;
    bank.isPickable = true;
    bank.rotation.y = Math.PI;
    bank.position.x = 40.8198819336906666;
    bank.position.y = 23.25;
    bank.position.z = -37.63999237061624;
    bank.checkCollisions = true;
    bank.physicsImpostor = new BABYLON.PhysicsImpostor(bank, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);

}

function createMovieTheatre() {
    var movieTheatreMaterial = new BABYLON.StandardMaterial("movieMaterial", scene);
    movieTheatreMaterial.diffuseTexture = new BABYLON.Texture("2.jpg");
    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.3, 0.0, 0.6, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.3, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.6, 0, 0.8, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.6, 0, 0.8, 1.0); //new BABYLON.Vector4(0.8, 0, 1, 1.0); //left side
    var movieTheatre = BABYLON.MeshBuilder.CreateBox("building", { width: 40, height: 50, depth: 10, faceUV: faceUV, wrap: true }, scene);
    movieTheatre.material = movieTheatreMaterial;
    movieTheatre.isPickable = true;
    movieTheatre.rotation.y = Math.PI;
    movieTheatre.position.x = -30.8198819336906666;
    movieTheatre.position.y = 23.25;
    movieTheatre.position.z = -37.63999237061624;
    movieTheatre.checkCollisions = true;
    movieTheatre.physicsImpostor = new BABYLON.PhysicsImpostor(movieTheatre, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);
}

function createRestaurant() {
    var restaurentMaterial = new BABYLON.StandardMaterial("resMaterial", scene);
    restaurentMaterial.diffuseTexture = new BABYLON.Texture("restaurant.jpg");
    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 1.0, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //new BABYLON.Vector4(0.8, 0, 1, 1.0); //left side
    var restaurent = BABYLON.MeshBuilder.CreateBox("building", { width: 45, height: 20, depth: 15, faceUV: faceUV, wrap: true }, scene);
    restaurent.material = restaurentMaterial;
    restaurent.isPickable = true;
    // restaurent.rotation.y = Math.PI;
    restaurent.position.x = -45.8198819336906666;
    restaurent.position.y = 8.5;
    restaurent.position.z = 58.63999237061624;
    restaurent.checkCollisions = true;
    restaurent.physicsImpostor = new BABYLON.PhysicsImpostor(restaurent, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);
}

function createFashionCafe() {
    var fashionCafeMaterial = new BABYLON.StandardMaterial("fasMaterial", scene);
    fashionCafeMaterial.diffuseTexture = new BABYLON.Texture("fashion.jpg");
    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 1.0, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //new BABYLON.Vector4(0.8, 0, 1, 1.0); //left side
    var fashionCafe = BABYLON.MeshBuilder.CreateBox("building", { width: 45, height: 20, depth: 15, faceUV: faceUV, wrap: true }, scene);
    fashionCafe.material = fashionCafeMaterial;
    fashionCafe.isPickable = true;
    // fashionCafe.rotation.y = Math.PI;
    fashionCafe.position.x = 45.8198819336906666;
    fashionCafe.position.y = 8.5;
    fashionCafe.position.z = 58.63999237061624;
    fashionCafe.checkCollisions = true;
    fashionCafe.physicsImpostor = new BABYLON.PhysicsImpostor(fashionCafe, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);
}

function createGameParlour() {
    var gameParlourMaterial = new BABYLON.StandardMaterial("gameMaterial", scene);
    gameParlourMaterial.diffuseTexture = new BABYLON.Texture("game.jpg");
    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.5, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //new BABYLON.Vector4(0.8, 0, 1, 1.0); //left side
    var gameParlour = BABYLON.MeshBuilder.CreateBox("building", { width: 40, height: 20, depth: 10, faceUV: faceUV, wrap: true }, scene);
    gameParlour.material = gameParlourMaterial;
    gameParlour.isPickable = true;
    gameParlour.rotation.y = -Math.PI / 2;
    gameParlour.position.x = -60.8198819336906666;
    gameParlour.position.y = 8.5;
    gameParlour.position.z = -2.63999237061624;
    gameParlour.checkCollisions = true;
    gameParlour.physicsImpostor = new BABYLON.PhysicsImpostor(gameParlour, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);
}

function createFreeBar() {
    var barMaterial = new BABYLON.StandardMaterial("barMaterial", scene);
    barMaterial.diffuseTexture = new BABYLON.Texture("bar.jpg");
    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.5, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.0, 0.0, 0.01, 1.0); //new BABYLON.Vector4(0.8, 0, 1, 1.0); //left side
    var bar = BABYLON.MeshBuilder.CreateBox("building", { width: 40, height: 20, depth: 10, faceUV: faceUV, wrap: true }, scene);
    bar.material = barMaterial;
    bar.isPickable = true;
    bar.rotation.y = Math.PI / 2;
    bar.position.x = 60.8198819336906666;
    bar.position.y = 8.5;
    bar.position.z = -2.63999237061624;
    bar.checkCollisions = true;
    bar.physicsImpostor = new BABYLON.PhysicsImpostor(bar, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0 }, scene);
}

function createBusStand() {
    // Bus stand
    // BABYLON.SceneLoader.ImportMeshAsync("", "", "BusStopEnclosure/BusStopEnclosure.obj").then(function (result) {
    //     // Retrieve the loaded meshes from the result object
    //     var meshes = result.meshes;

    //     // Do additional operations on the loaded model, if needed
    //     meshes.forEach(function (mesh) {
    //         mesh.position = new BABYLON.Vector3(37, -1, 25);
    //         // mesh.material = benchMaterial;
    //         mesh.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    //         mesh.rotation.x = -Math.PI/2;
    //         mesh.rotation.y = -Math.PI/2;
    //         var b0 = BABYLON.Mesh.CreateBox("b0", 1, scene);
    //         b0.scaling = new BABYLON.Vector3(2, 5, 8);
    //         b0.position.x = 37;
    //         b0.position.z = 26;
    //         b0.checkCollisions = true;
    //         b0.isVisible = false;            
    //         b0.rotation.y = Math.PI/2;

    //         b0.physicsImpostor = new BABYLON.PhysicsImpostor(b0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    //     });
    //     // Example: Enable shadows for the loaded model
    //     meshes.forEach(function (mesh) {
    //         mesh.receiveShadows = true;
    //         mesh.castShadows = true;
    //     });
    // });
}

function VDSO_UI() {
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
}

function boundryArea() {

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
}

// Player of the game
function createPlayer(){
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
    return hero;
}

var buildScene = async function (scene) {
    var colyseusSDK = new Colyseus.Client(HOST_ENDPOINT);
    loadingText.text = "Connecting with the server, please wait...";

    //
    // Connect with Colyseus server
    //
    var room = await colyseusSDK.joinOrCreate(ROOM_NAME);
    loadingText.text = "Connection established!";

    // Local entity map
    var playerEntities = {};
    var playerNextPosition = {};

    // 
    // schema callback: on player add
    // 
    room.state.players.onAdd((player, sessionId) => {
        var isCurrentPlayer = (sessionId === room.sessionId);
        
        // var sphere = BABYLON.MeshBuilder.CreateSphere(`player-${sessionId}`, {
        //     segments: 8,
        //     diameter: 40
        // });

        // // Set player mesh properties
        // sphere.material = new BABYLON.StandardMaterial(`playerMat-${sessionId}`);
        // sphere.material.emissiveColor = (isCurrentPlayer) ? BABYLON.Color3.FromHexString("#ff9900") : BABYLON.Color3.Gray();

        // // Set player spawning position
        // sphere.position.set(player.x, player.y, player.z);

        // playerEntities[sessionId] = sphere;
        // playerNextPosition[sessionId] = sphere.position.clone();

        // // listen for individual player changes
        // player.onChange(() => {
        //     playerNextPosition[sessionId].set(player.x, player.y, player.z);
        // });
    });

}

// Scene creation function
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

    // Display "loading" text
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("textUI");

    loadingText.text = "Loading the Colyseus SDK file...";
    loadingText.color = "#fff000"
    loadingText.fontFamily = "Roboto";
    loadingText.fontSize = 24;
    loadingText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    loadingText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    loadingText.paddingBottom = "10px";
    advancedTexture.addControl(loadingText);

    document.addEventListener('DOMContentLoaded', function() {
        // build the final scene
        console.log("Here");
        buildScene(scene);
    });

    //Hero
    var hero = createPlayer();
    hero.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, 0);
    hero.position.x = 0.0;
    hero.position.y = 1.0;
    hero.position.z = 0.0;
    hero.physicsImpostor = new BABYLON.PhysicsImpostor(hero, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.0, friction: 0.0 }, scene);
    camera.rotation.y = -Math.PI / 2;

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

    // setInterval(() => {
    //     console.log(camera.position);
    // }, 1000);


    scene.registerBeforeRender(function () {
        // Your code here

        // Flow
        camera.position.x = hero.position.x;
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
        hero.physicsImpostor.physicsBody.velocity.x = move.x;
        hero.physicsImpostor.physicsBody.velocity.z = move.z;
        hero.physicsImpostor.physicsBody.velocity.y = move.y;

    });

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
    // Creating the and ground
    createBase(); 
    
    // Box
    // Create wallHouse building
    createWallHouse();

    // Creating Bank
    createBank();

    // Creating Bar
    createFreeBar();

    // Creating MovieTheatre
    createMovieTheatre();

    // Creating Game Parlour
    createGameParlour();

    // Creating Restaurant
    createRestaurant();

    // Creating FashinCafe
    createFashionCafe();

    // Adding Bus Stand
    createBusStand();

    // Adding boundries on each side
    // So that player cannot move outside of ground
    boundryArea();



    //Atmosphere

    //Light
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 60, 0), scene);
    var gl = new BABYLON.GlowLayer("sphere", scene);
    light1.intensity = 0.5;
    light2.intensity = .5;

    return scene;
};


// Get a reference to the canvas element
var canvas = document.getElementById("renderCanvas");

// Create the Babylon.js engine
var engine = new BABYLON.Engine(canvas, true);

var loadingText = new BABYLON.GUI.TextBlock("instructions");

// Create the scene
var scene = createScene(engine);

// Create a light
var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, 0, 0), scene);

// Render the scene
engine.runRenderLoop(function () {
    scene.render();
});

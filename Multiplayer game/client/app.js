var HOST_ENDPOINT = "ws://localhost:2567";
var ROOM_NAME = "my_room";
var scriptUrl = "https://unpkg.com/colyseus.js@^0.15.0-preview.2/dist/colyseus.js";
var externalScript = document.createElement("script");
externalScript.src = scriptUrl;
document.head.appendChild(externalScript);

var createScene = function (engine) {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, 1.0, 550, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var ground = BABYLON.MeshBuilder.CreatePlane("ground", { size: 500 }, scene);
    ground.position.y = -15;
    ground.rotation.x = Math.PI / 2;

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

    // build scene only after Colyseus SDK script is loaded.
    externalScript.onload = function() {
        // build the final scene
        buildScene(scene);
    };
    return scene;
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

        var sphere = BABYLON.MeshBuilder.CreateSphere(`player-${sessionId}`, {
            segments: 8,
            diameter: 40
        });

        // Set player mesh properties
        sphere.material = new BABYLON.StandardMaterial(`playerMat-${sessionId}`);
        sphere.material.emissiveColor = (isCurrentPlayer) ? BABYLON.Color3.FromHexString("#ff9900") : BABYLON.Color3.Gray();

        // Set player spawning position
        sphere.position.set(player.x, player.y, player.z);

        playerEntities[sessionId] = sphere;
        playerNextPosition[sessionId] = sphere.position.clone();

        // listen for individual player changes
        player.onChange(() => {
            playerNextPosition[sessionId].set(player.x, player.y, player.z);
        });
    });

    // 
    // schema callback: on player remove
    // 
    room.state.players.onRemove((player, sessionId) => {
        playerEntities[sessionId].dispose();
        delete playerEntities[sessionId];
        delete playerNextPosition[sessionId];
    });

    // on room disconnection
    room.onLeave(code => {
        loadingText.text = "Disconnected from the room.";
    });

    // Add click event handler to move current player
    scene.onPointerDown = (event, pointer) => {
        if (event.button == 0) {
            var targetPosition = pointer.pickedPoint.clone();

            // Position adjustments for the current play ground.
            targetPosition.y = -1;
            if (targetPosition.x > 245) targetPosition.x = 245;
            else if (targetPosition.x < -245) targetPosition.x = -245;
            if (targetPosition.z > 245) targetPosition.z = 245;
            else if (targetPosition.z < -245) targetPosition.z = -245;

            // set current player's next position immediatelly
            playerNextPosition[room.sessionId] = targetPosition;

            // Send position update to the server
            room.send("updatePosition", {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
            });
        }
    };

    //
    // Smooth player positions using lerp
    // https://doc.babylonjs.com/typedoc/classes/babylon.scalar#lerp
    //
    scene.registerBeforeRender(() => {
        for (let sessionId in playerEntities) {
            var entity = playerEntities[sessionId];
            var targetPosition = playerNextPosition[sessionId];
            entity.position = targetPosition;//BABYLON.Vector3.Lerp(entity.position, targetPosition, 0.05);
        }
    })
};

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var loadingText = new BABYLON.GUI.TextBlock("instructions");
const scene = createScene(engine)
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
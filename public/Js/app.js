window.addEventListener('DOMContentLoaded', function () {
    // Create Babylon.js scene and engine
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // Create a camera
    var camera = new BABYLON.ArcRotateCamera("arcR", -Math.PI / 2, Math.PI / 2, 15, BABYLON.Vector3.Zero(), scene);
    // camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Create light
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    
    var scheduler = new Scheduler("http://localhost:8000/getAvailableFiles");

    // Create the object
    var myObject1 = new VirtualSignageLandScape(scene);
    myObject1.setPosition(5);

    // Create the object
    var myObject2 = new VirtualSignageLandScape(scene);
    myObject2.setPosition(-5);

    // Send a message to the object
    myObject1.sendMessage("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4");
    myObject1.setId(scheduler.addVDSO(myObject1));
    myObject2.setId(scheduler.addVDSO(myObject2));
    
    var temp = 0;
    engine.runRenderLoop(function () {
        var deltaTime = scene.getEngine().getDeltaTime();
        temp += deltaTime;
        if(temp > 5000)
        {
            console.log("API call");
            scheduler.getSchedule();
            temp = 0;
        }
        scene.render();
    });
});
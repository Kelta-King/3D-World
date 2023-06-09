class VirtualSignage {
    constructor(
        scene,
        height,
        width,
        defaultURL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    ) {
        var planeOpts = {
            height: height,
            width: width,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        };

        this.vdsoId = -1; // Means not listed yet
        this.display = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
        var videoMat = new BABYLON.StandardMaterial("m", scene);
        var videoVidTex = new BABYLON.VideoTexture("vidtex", defaultURL, scene);
        videoMat.diffuseTexture = videoVidTex;
        videoMat.roughness = 1;
        videoMat.emissiveColor = new BABYLON.Color3.White();

        this.display.material = videoMat;

        this.display.messageObservable = new BABYLON.Observable();

        // Function to send a message to the object
        this.display.sendMessage = function (message) {
            // Notify the observers
            // console.log(this.display);
            // this.display.messageObservable.notifyObservers(message);
        };

        // Subscribe to the message observable
        this.display.messageObservable.add((message) => {
            console.log('Received message:', message);
            this.display.material.diffuseTexture.video.pause();
            this.display.material.diffuseTexture.video.src = message;
            this.display.material.diffuseTexture.video.play();
        });
    }

    getDisplay = () => {
        return this.display;
    }

    setPosition = (x = 0, y = 0, z = 0) => {
        var vidPos = (new BABYLON.Vector3(x, y, z))
        this.display.position = vidPos;
    }

    getPosition = () => {
        return this.display.position;
    }

    setId = (id) => {
        this.vdsoId = id;
    }

    getId = (id) => {
        return this.vdsoId;
    }

    sendMessage = (message) => {
        // this.display.sendMessage(message);
        this.display.messageObservable.notifyObservers(message);
    }
}

class VirtualSignageLandScape extends VirtualSignage {
    constructor(scene) {
        // Provide video with proper orientation. 16:9 works
        super(
            scene,
            9 / 2, // height
            16 / 2, // width
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        );
    }
}

class VirtualPortraitSignage extends VirtualSignage {
    constructor(scene) {
        // Provide video with proper orientation. 9:16 works
        super(
            scene,
            16 / 2, // height
            9 / 2, // width
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        );
    }
}
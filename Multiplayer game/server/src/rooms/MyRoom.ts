import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";
var x = 0;

export class MyRoom extends Room<MyRoomState> {

    onCreate(options: any) {
        this.setState(new MyRoomState());

        this.onMessage("updatePosition", (client, message) => {
            const player = this.state.players.get(client.sessionId);            
            player.x = message.x;
            player.y = message.y;
            player.z = message.z;
            
        });

    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");

        // create Player instance
        const player = new Player();

        if(x%2 == 0)
        {
            player.x = 0.0;
            player.y = 1.0;
            player.z = 0.0;
            player.color = "#FF0000";
            x++;
        }
        else 
        {
            player.x = 20.0;
            player.y = 1.0;
            player.z = 0.0;
            player.color = "#0000FF";
            x++;
        }
        player.moveX = 0;
        player.moveY = 0;
        player.moveZ = 0;
        player.name = String("Player - "+client.sessionId);

        // place Player at a random position
        // const FLOOR_SIZE = 500;
        // player.x = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
        // player.y = -1;
        // player.z = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);

        // place player in the map of players by its sessionId
        // (client.sessionId is unique per connection!)
        
        this.state.players.set(client.sessionId, player);
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");

        this.state.players.delete(client.sessionId);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}

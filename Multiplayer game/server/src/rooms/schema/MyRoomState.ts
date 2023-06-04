//import { Schema, Context, type } from "@colyseus/schema";
import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("number") x: number;
    @type("number") y: number;
    @type("number") z: number;
    @type("string") color: string; 
    @type("string") name: string; 
    @type("number") moveX: number;
    @type("number") moveY: number;
    @type("number") moveZ: number;
}

export class MyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
} 


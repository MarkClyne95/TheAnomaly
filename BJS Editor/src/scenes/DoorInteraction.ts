import { Mesh } from "@babylonjs/core";
import { visibleInInspector } from "./decorators";
import player from "./player";

export default class DoorInteraction {
    constructor() { }
    playerRef = new player();

    public onStart(): void{
        this.playerRef.SetBatteryCount(12);
    }

    public onUpdate(): void {
    }

    public onCollide(): void {
        
    }
}
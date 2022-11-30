import { Mesh } from "@babylonjs/core";
import "./player.ts";
export declare class DoorInteraction extends Mesh {
    onInitialize(): void;
    constructor(player: player);
    private CollisionDetection;
    private _beforeRenderUpdate;
}

import player from "./player";
export default class DoorInteraction {
    constructor();
    playerRef: player;
    onStart(): void;
    onUpdate(): void;
    onCollide(): void;
}

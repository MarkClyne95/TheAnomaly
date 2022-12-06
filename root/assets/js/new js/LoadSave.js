export default class LoadSave {
    constructor() {}

    /**
     * @param {Player} player
     */
    SaveGame(player) {
        localStorage.setItem("playerName", player.name);
        localStorage.setItem("batteryCount", player.batteryCount);
        localStorage.setItem("oxygenMeter", player.oxygenMeter);
        localStorage.setItem("firstDoorFlag", player.firstDoorFlag);
        localStorage.setItem("secondDoorFlag", player.secondDoorFlag);
    }

    LoadGame() {
        let player = localStorage.getItem("player");
        return player;
    }
}
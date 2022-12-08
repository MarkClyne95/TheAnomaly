import { Player } from "../player.js";

export default class LoadSave {
    constructor() {}

    /**
     * @param {Player} player
     */
    SaveGame(player) {
        localStorage.setItem("batteryCount", player.batteryCount);
        localStorage.setItem("anxietyMeter", player.anxietyMeter);
        localStorage.setItem("oxygenMeter", player.oxygenMeter);
        localStorage.setItem("firstDoorFlag", player.firstDoorFlag);
        localStorage.setItem("secondDoorFlag", player.secondDoorFlag);
        localStorage.setItem("hasMultitool", player.hasMultitool);
    }

    LoadGame() {
        let ls = localStorage;
        let player = new Player(ls.getItem("batteryCount"), ls.getItem("anxietyMeter"), ls.getItem("oxygenMeter"), ls.getItem("firstDoorFlag"), ls.getItem("secondDoorFlag"), ls.getItem("hasMultitool"));
        return player;
    }
}
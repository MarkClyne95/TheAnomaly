let name = "";
let batteryCount = 0;
let anxietyMeter = 0;
let oxygenMeter = 0;
let firstDoorFlag = false;
let secondDoorFlag = false;


export class Player {
    constructor() {
        this.name = "David";
        this.batteryCount = 0;
        this.anxietyMeter = 0;
        this.oxygenMeter = 0;
        this.firstDoorFlag = false;
        this.secondDoorFlag = false;
    }

    //#region getting and setting data properties

    /**
     * @param {number} amount
     */
    set SetBatteryCount(amount) {
        this.batteryCount = amount;
    }

    get getBatteryCount() {
        return this.batteryCount;
    }

    /**
     * @param {number} amount
     */
    set SetAnxietyMeter(amount) {
        this.anxietyMeter = amount;
    }

    get getAnxietyMeter() {
        return this.anxietyMeter;
    }

    /**
     * @param {number} amount
     */
    set SetOxygenMeter(amount) {
        this.oxygenMeter = amount;
    }

    get getOxygenMeter() {
        return this.oxygenMeter;
    }

    //#endregion

}
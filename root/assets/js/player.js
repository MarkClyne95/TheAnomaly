let name = "David";
let batteryCount = 0;
let anxietyMeter = 0;
let oxygenMeter = 0;
let firstDoorFlag = false;
let secondDoorFlag = false;
let hasMultitool = false;


export class Player {

    constructor(bcount, ameter, ometer, fdflag, sdflag, hasMt) {
        this.name = "David";
        this.batteryCount = bcount;
        this.anxietyMeter = ameter;
        this.oxygenMeter = ometer;
        this.firstDoorFlag = fdflag;
        this.secondDoorFlag = sdflag;
        this.hasMultitool = hasMt;
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
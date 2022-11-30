export default class player {
    constructor();
    private hasTool;
    private firstDoorFlag;
    private secondDoorFlag;
    private batteryCount;
    SetTool(param: boolean): void;
    SetFirstDoorFlag(param: boolean): void;
    SetSecondDoorFlag(param: boolean): void;
    SetBatteryCount(num: number): void;
    onStart(): void;
}

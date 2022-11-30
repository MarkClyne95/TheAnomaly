import { visibleInInspector } from "./decorators";

export default class player {
    constructor() {
    }

    @visibleInInspector("boolean", "Has Multitool", false)
    private hasTool: boolean;
    
    @visibleInInspector("boolean", "First Door Flag", false)
    private firstDoorFlag: boolean;
    
    @visibleInInspector("boolean", "Second Door Flag", false)
    private secondDoorFlag: boolean;

    @visibleInInspector("number", "Battery Count", 0)
    private batteryCount: number;

    @visibleInInspector("number", "Tension Meter", 0)
    private tensionMeter: number;
    

    SetTool(param : boolean) {
        this.hasTool = param;
    }

    SetFirstDoorFlag(param : boolean) {
        this.firstDoorFlag = param;
    }

    SetSecondDoorFlag(param : boolean) {
        this.secondDoorFlag = param;
    }

    SetBatteryCount(num : number) {
        this.batteryCount = num;
    }

    MusicChanger()
    {
        if (this.tensionMeter >= 60)
        {
            //play sound effect to tell anomaly is near   
        }
        else
        {
            //play normal ambient music    
        }
    }

    public onStart(): void {
        this.batteryCount = 12;
        console.log(this.batteryCount);
    }

    public onUpdate(): void {
        this.MusicChanger();
    }
}
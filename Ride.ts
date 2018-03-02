export default class Ride {
    constructor(id: number, inputInstructions: string[]) {
        this.id = id;

        this.startRow = parseInt(inputInstructions[0]);
        this.startColumn = parseInt(inputInstructions[1]);
        this.endRow = parseInt(inputInstructions[2]);
        this.endColumn = parseInt(inputInstructions[3]);
        this.earliestStart = parseInt(inputInstructions[4]);
        this.latestFinish = parseInt(inputInstructions[5]);
    }

    readonly id: number;
    readonly startRow: number;
    readonly startColumn: number;
    readonly endRow: number;
    readonly endColumn: number;
    readonly earliestStart: number;
    readonly latestFinish: number;

    isSet: boolean = false;
    isFinished: boolean = false;
}
export default class Ride {
    constructor(id: number, ...rideDescription: string[]);
    constructor(id: number, startRow: string, startColumn: string, endRow: string, endColumn: string, earliestStart: string, latestFinish: string) {
        this.id = id;

        this.startRow = parseInt(startRow);
        this.startColumn = parseInt(startColumn);
        this.endRow = parseInt(endRow);
        this.endColumn = parseInt(endColumn);
        this.earliestStart = parseInt(earliestStart);
        this.latestFinish = parseInt(latestFinish);
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
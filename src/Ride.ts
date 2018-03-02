import Point from "./Point";

export default class Ride {
    readonly id: number;
    readonly startPosition: Point;
    readonly endPosition: Point;
    readonly earliestStart: number;
    readonly latestFinish: number;

    isSet: boolean = false;
    isFinished: boolean = false;

    constructor(id: number, ...rideDescription: string[]);
    constructor(id: number, startRow: string, startColumn: string, endRow: string, endColumn: string, earliestStart: string, latestFinish: string) {
        this.id = id;

        this.startPosition = new Point(parseInt(startColumn), parseInt(startRow));
        this.endPosition = new Point(parseInt(endColumn), parseInt(endRow));
        this.earliestStart = parseInt(earliestStart);
        this.latestFinish = parseInt(latestFinish);
    }
}
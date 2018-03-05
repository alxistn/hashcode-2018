import Point from "./Point";

export default class Ride {
    public readonly id: number;
    public readonly startPosition: Point;
    public readonly endPosition: Point;
    public readonly earliestStart: number;
    public readonly latestFinish: number;

    public isFinished: boolean = false;

    constructor(id: number, ...rideDescription: string[]);
    constructor(id: number, startRow: string, startColumn: string,
                endRow: string, endColumn: string, earliestStart: string, latestFinish: string) {

        this.id = id;

        this.startPosition = new Point(parseInt(startColumn, 10), parseInt(startRow, 10));
        this.endPosition = new Point(parseInt(endColumn, 10), parseInt(endRow, 10));
        this.earliestStart = parseInt(earliestStart, 10);
        this.latestFinish = parseInt(latestFinish, 10);
    }
}

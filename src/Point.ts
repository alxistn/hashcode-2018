export default class Point {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public distance(point: Point): number {
        return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
    }

    public isEqual(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }
}
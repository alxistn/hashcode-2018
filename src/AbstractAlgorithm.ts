import * as fs from "fs";

import Ride from "./Ride";

export default abstract class AbstractAlgorithm {
    protected _fileName: string;

    protected _rows: number;
    protected _columns: number;
    protected _totalVehicles: number;
    protected _totalRides: number;
    protected _bonus: number;
    protected _maximumSteps: number;

    protected _availableRides: Ride[] = [];
    protected _data: string[];

    constructor(fileName: string) {
        this._fileName = fileName;

        const fileContent = fs.readFileSync(`./input/${this._fileName}.in`, "utf-8");
        this._data = fileContent.split("\n");

        const metaSimulation = this._data[0].split(" ");

        this._rows = parseInt(metaSimulation[0], 10);
        this._columns = parseInt(metaSimulation[1], 10);
        this._totalVehicles = parseInt(metaSimulation[2], 10);
        this._totalRides = parseInt(metaSimulation[3], 10);
        this._bonus = parseInt(metaSimulation[4], 10);
        this._maximumSteps = parseInt(metaSimulation[5], 10);
    }

    public init() {
        this.generateCars();
        this.generateRides();
    }

    protected abstract generateCars(): void;

    private generateRides() {
        for (let i = 1, l = this._data.length; i < l; ++i) {
            const rideDescription = this._data[i].split(" ");

            if (rideDescription.length === 6) {
                this._availableRides.push(new Ride(i - 1, ...rideDescription));
            }
        }
    }
}

import * as fs from "fs";

import Car from "./Car";
import Ride from "./Ride";

export default class RideBatch {
    private _fileName: string;

    private _rows: number;
    private _columns: number;
    private _totalVehicles: number;
    private _totalRides: number;
    private _bonus: number;
    private _maximumSteps: number;

    private _availableRides: Ride[] = [];
    private _cars: Car[] = [];
    private _data: string[];

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

        this.generateCars();
        this.generateRides();
    }

    public output() {
        let file = "";
        for (const car of this._cars) {
            file += car.summarize(this._availableRides) + "\n";
        }
        fs.writeFileSync(`output/${this._fileName}.ou`, file);
    }

    private generateCars() {
        for (let i = 0; i < this._totalVehicles; i++) {
            this._cars.push(new Car(i, this._bonus));
        }
    }

    private generateRides() {
        for (let i = 1, l = this._data.length; i < l; ++i) {
            const rideDescription = this._data[i].split(" ");

            if (rideDescription.length === 6) {
                this._availableRides.push(new Ride(i - 1, ...rideDescription));
            }
        }
    }
}

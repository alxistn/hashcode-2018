import * as fs from "fs";

import AbstractAlgorithm from "../AbstractAlgorithm";
import PredictionCar from "./PredictionCar";

export default class PredictionAlgorithm extends AbstractAlgorithm {
    private _cars: PredictionCar[] = [];

    public output() {
        let file = "";
        for (const car of this._cars) {
            file += car.predictRides(this._availableRides) + "\n";
        }
        fs.writeFileSync(`output/${this._fileName}.ou`, file);
    }

    protected generateCars() {
        for (let i = 0; i < this._totalVehicles; i++) {
            this._cars.push(new PredictionCar(i, this._bonus));
        }
    }
}

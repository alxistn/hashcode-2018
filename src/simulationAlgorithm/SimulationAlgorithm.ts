import * as fs from "fs";

import AbstractAlgorithm from "../AbstractAlgorithm";
import SimulationCar from "./SimulationCar";

export default class SimulationAlgorithm extends AbstractAlgorithm {
    private _cars: SimulationCar[] = [];
    private _currentStep: number = 0;

    public start() {
        while (this._currentStep < this._maximumSteps) {
            for (const car of this._cars) {
                car.nextStep(this._currentStep, this._availableRides);
            }
            this._currentStep++;
        }
        this.output();
    }

    protected generateCars() {
        for (let i = 0; i < this._totalVehicles; i++) {
            this._cars.push(new SimulationCar(i, this._bonus));
        }
    }

    private output() {
        let file = "";
        for (const car of this._cars) {
            file += car.summarize() + "\n";
        }

        fs.writeFileSync(`output/${this._fileName}.ou`, file);
    }
}

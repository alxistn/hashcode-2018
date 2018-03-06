import Car from "./Car";
import Ride from "./Ride";

export default class TotalScore {
    private static _instance: TotalScore;

    private _currentFile = "";
    private _filesScores: {[key: string]: number} = {};
    private _totalScore: number = 0;

    public static get Instance(): TotalScore {
        return this._instance || (this._instance = new this());
    }

    public addRide(ride: Ride, car: Car) {
        if (this._currentFile) {
            if (!this._filesScores[this._currentFile]) {
                this._filesScores[this._currentFile] = 0;
            }

            const carDistance: number = car.position.distance(ride.startPosition);
            let totalPoints: number = ride.startPosition.distance(ride.endPosition);

            if (car.currentStep + carDistance <= ride.earliestStart) {
                totalPoints += car.rideBonus;
            }

            this._totalScore += totalPoints;
            this._filesScores[this._currentFile] += totalPoints;
        }
    }

    public setFile(fileName: string) {
        this._currentFile = fileName;
    }

    public printCurrentFileScore() {
        console.log(`${this._currentFile} score : ${this._filesScores[this._currentFile]}`);
    }

    public printTotalScore() {
        console.log(`Total score : ${this._totalScore}`);
    }

    public printScore() {
        for (const fileName in this._filesScores) {
            if (this._filesScores.hasOwnProperty(fileName)) {
                console.log(`${fileName} score : ${this._filesScores[fileName]}`);
            }
        }
        console.log(`Total score : ${this._totalScore}`);
    }
}

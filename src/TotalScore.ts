import AbstractCar from "./AbstractCar";
import Ride from "./Ride";

export default class TotalScore {
    public static reset() {
        this._instance = new this();
    }

    private static _instance: TotalScore;

    private _actualRecord: {[key: string]: number};
    private _currentFile = "";
    private _filesScores: {[key: string]: number} = {};
    private _totalScore: number = 0;

    private constructor() {
        this._actualRecord = {
            a_example: 10,
            b_should_be_easy: 176820,
            c_no_hurry: 15791787,
            d_metropolis: 10142889,
            e_high_bonus: 21460789,
            total: 47289281,
        };
    }

    public static get Instance(): TotalScore {
        return this._instance || (this._instance = new this());
    }

    public addRide(ride: Ride, car: AbstractCar) {
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
        const currentFileScore = this._filesScores[this._currentFile];
        const recordScore = this._actualRecord[this._currentFile];

        this.printFileScore(currentFileScore, recordScore);
    }

    public printTotalScore() {
        const recordScore = this._actualRecord.total;

        console.log("\x1b[36m%s\x1b[0m", "----------------------------------------------------");
        console.log("\x1b[34m%s\x1b[0m", `Total score : ${this._totalScore}`);
        if (this._totalScore > recordScore) {
            console.log("\x1b[32m%s\x1b[0m", "New record !");
        } else if (this._totalScore < recordScore) {
            console.log("\x1b[31m%s\x1b[0m", "Score is lower than record :(");
        } else {
            console.log("\x1b[33m%s\x1b[0m", "Equalized record");
        }
        console.log("\x1b[36m%s\x1b[0m", "----------------------------------------------------");
    }

    public printScore() {
        for (const fileName in this._filesScores) {
            if (this._filesScores.hasOwnProperty(fileName)) {
                const currentFileScore = this._filesScores[fileName];
                const recordScore = this._actualRecord[fileName];

                this.printFileScore(currentFileScore, recordScore);
            }
        }
        this.printTotalScore();
    }

    private printFileScore(currentFileScore: number, recordScore: number) {
        console.log("\x1b[36m%s\x1b[0m", "----------------------------------------------------");
        console.log("\x1b[34m%s\x1b[0m", `${this._currentFile} score : ${currentFileScore}`);
        if (currentFileScore > recordScore) {
            console.log("\x1b[32m%s\x1b[0m", "New record !");
        } else if (currentFileScore < recordScore) {
            console.log("\x1b[31m%s\x1b[0m", "Score is lower than record :(");
        } else {
            console.log("\x1b[33m%s\x1b[0m", "Equalized record");
        }
        console.log("\x1b[36m%s\x1b[0m", "----------------------------------------------------");
    }
}

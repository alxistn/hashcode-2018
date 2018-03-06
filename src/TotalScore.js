"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TotalScore = /** @class */ (function () {
    function TotalScore() {
        this._currentFile = "";
        this._filesScores = {};
        this._totalScore = 0;
        this._actualRecord = {
            a_example: 10,
            b_should_be_easy: 154759,
            c_no_hurry: 15791787,
            d_metropolis: 10142889,
            e_high_bonus: 21165549,
            total: 47254994,
        };
    }
    Object.defineProperty(TotalScore, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    TotalScore.prototype.addRide = function (ride, car) {
        if (this._currentFile) {
            if (!this._filesScores[this._currentFile]) {
                this._filesScores[this._currentFile] = 0;
            }
            var carDistance = car.position.distance(ride.startPosition);
            var totalPoints = ride.startPosition.distance(ride.endPosition);
            if (car.currentStep + carDistance <= ride.earliestStart) {
                totalPoints += car.rideBonus;
            }
            this._totalScore += totalPoints;
            this._filesScores[this._currentFile] += totalPoints;
        }
    };
    TotalScore.prototype.setFile = function (fileName) {
        this._currentFile = fileName;
    };
    TotalScore.prototype.printCurrentFileScore = function () {
        var currentFileScore = this._filesScores[this._currentFile];
        var recordScore = this._actualRecord[this._currentFile];
        this.printFileScore(currentFileScore, recordScore);
    };
    TotalScore.prototype.printTotalScore = function () {
        var recordScore = this._actualRecord.total;
        console.log("\x1b[36m%s\x1b[0m", "-----------------------------------------------------");
        console.log("\x1b[34m%s\x1b[0m", "Total score : " + this._totalScore);
        if (this._totalScore > recordScore) {
            console.log("\x1b[32m%s\x1b[0m", "New record !");
        }
        else if (this._totalScore < recordScore) {
            console.log("\x1b[31m%s\x1b[0m", "Score is lower than record :(");
        }
        else {
            console.log("\x1b[33m%s\x1b[0m", "Equalized record");
        }
        console.log("\x1b[36m%s\x1b[0m", "-----------------------------------------------------");
    };
    TotalScore.prototype.printScore = function () {
        for (var fileName in this._filesScores) {
            if (this._filesScores.hasOwnProperty(fileName)) {
                var currentFileScore = this._filesScores[fileName];
                var recordScore = this._actualRecord[fileName];
                this.printFileScore(currentFileScore, recordScore);
            }
        }
        this.printTotalScore();
    };
    TotalScore.prototype.printFileScore = function (currentFileScore, recordScore) {
        console.log("\x1b[36m%s\x1b[0m", "-----------------------------------------------------");
        console.log("\x1b[34m%s\x1b[0m", this._currentFile + " score : " + currentFileScore);
        if (currentFileScore > recordScore) {
            console.log("\x1b[32m%s\x1b[0m", "New record !");
        }
        else if (currentFileScore < recordScore) {
            console.log("\x1b[31m%s\x1b[0m", "Score is lower than record :(");
        }
        else {
            console.log("\x1b[33m%s\x1b[0m", "Equalized record");
        }
        console.log("\x1b[36m%s\x1b[0m", "-----------------------------------------------------");
    };
    return TotalScore;
}());
exports.default = TotalScore;

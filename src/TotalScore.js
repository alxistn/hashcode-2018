"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TotalScore = /** @class */ (function () {
    function TotalScore() {
        this._currentFile = "";
        this._filesScores = {};
        this._totalScore = 0;
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
        console.log(this._currentFile + " score : " + this._filesScores[this._currentFile]);
    };
    TotalScore.prototype.printTotalScore = function () {
        console.log("Total score : " + this._totalScore);
    };
    TotalScore.prototype.printScore = function () {
        for (var fileName in this._filesScores) {
            if (this._filesScores.hasOwnProperty(fileName)) {
                console.log(fileName + " score : " + this._filesScores[fileName]);
            }
        }
        console.log("Total score : " + this._totalScore);
    };
    return TotalScore;
}());
exports.default = TotalScore;

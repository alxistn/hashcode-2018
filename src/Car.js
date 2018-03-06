"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(require("./Point"));
var TotalScore_1 = __importDefault(require("./TotalScore"));
var Car = /** @class */ (function () {
    function Car(id, rideBonus) {
        this._currentStep = 0;
        this._rideIds = [];
        this.id = id;
        this._rideBonus = rideBonus;
        this._position = new Point_1.default();
        this._totalScore = TotalScore_1.default.Instance;
    }
    Object.defineProperty(Car.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "currentStep", {
        get: function () {
            return this._currentStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "rideBonus", {
        get: function () {
            return this._rideBonus;
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.summarize = function (availableRides) {
        var ridesOrder = "";
        this.findBestRides(availableRides);
        this._rideIds.map(function (rideId) {
            ridesOrder += (rideId + " ");
        });
        return this._rideIds.length + " " + ridesOrder;
    };
    Car.prototype.findBestRides = function (availableRides) {
        var running = true;
        while (running) {
            if (!this.findBestRide(availableRides)) {
                running = false;
            }
        }
    };
    Car.prototype.findBestRide = function (availableRides) {
        var bestRide = availableRides[0];
        var bestRatio = 0;
        var bestRideIndex = -1;
        for (var i = availableRides.length - 1; i >= 0; --i) {
            var ride = availableRides[i];
            var ratio = this.calculatePointsPerStep(ride);
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestRide = ride;
                bestRideIndex = i;
            }
        }
        if (bestRideIndex >= 0) {
            availableRides.splice(availableRides.indexOf(bestRide), 1);
            this.setRide(bestRide);
            this.updateCurrentStep(bestRide);
            return true;
        }
        return false;
    };
    Car.prototype.updateCurrentStep = function (ride) {
        var carDistance = this._position.distance(ride.startPosition);
        var rideDistance = ride.startPosition.distance(ride.endPosition);
        var stepsUntilRideBegin = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        this._currentStep += (carDistance + rideDistance + stepsUntilRideBegin) - 1;
    };
    Car.prototype.setRide = function (ride) {
        this._totalScore.addRide(ride, this);
        this._rideIds.push(ride.id);
    };
    Car.prototype.calculatePointsPerStep = function (ride) {
        var carDistance = this._position.distance(ride.startPosition);
        var rideDistance = ride.startPosition.distance(ride.endPosition);
        var stepsUntilRideBegin = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        var totalSteps = rideDistance +
            (carDistance > stepsUntilRideBegin ? carDistance : stepsUntilRideBegin);
        var totalPoints = rideDistance;
        if (this._currentStep + totalSteps >= ride.latestFinish) {
            return 0;
        }
        if (this._currentStep + carDistance <= ride.earliestStart) {
            totalPoints += this._rideBonus;
        }
        return totalPoints / totalSteps;
    };
    return Car;
}());
exports.default = Car;

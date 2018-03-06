"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(require("./Point"));
var TotalScore_1 = __importDefault(require("./TotalScore"));
var AbstractCar = /** @class */ (function () {
    function AbstractCar(id, rideBonus) {
        this._currentStep = 0;
        this._rides = [];
        this.id = id;
        this._rideBonus = rideBonus;
        this._position = new Point_1.default();
        this._totalScore = TotalScore_1.default.Instance;
    }
    Object.defineProperty(AbstractCar.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCar.prototype, "currentStep", {
        get: function () {
            return this._currentStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCar.prototype, "rideBonus", {
        get: function () {
            return this._rideBonus;
        },
        enumerable: true,
        configurable: true
    });
    AbstractCar.prototype.summarize = function () {
        var ridesOrder = "";
        this._rides.map(function (ride) {
            ridesOrder += (ride.id + " ");
        });
        return this._rides.length + " " + ridesOrder;
    };
    AbstractCar.prototype.findBestRide = function (availableRides) {
        var bestRide = availableRides[0];
        var bestRatio = 0;
        var bestRideIndex = -1;
        for (var i = availableRides.length - 1; i >= 0; --i) {
            var ride = availableRides[i];
            if (this._currentStep >= ride.latestFinish) {
                bestRideIndex = this.handleImpossibleRide(availableRides, i, bestRideIndex);
                continue;
            }
            var ratio = this.calculatePointsPerStep(ride);
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestRide = ride;
                bestRideIndex = i;
            }
        }
        if (bestRideIndex >= 0) {
            this.setRide(availableRides, bestRide);
            return true;
        }
        return false;
    };
    AbstractCar.prototype.calculatePointsPerStep = function (ride) {
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
    return AbstractCar;
}());
exports.default = AbstractCar;

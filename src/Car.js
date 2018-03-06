"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var CarState_1 = __importDefault(require("./CarState"));
var Point_1 = __importDefault(require("./Point"));
var TotalScore_1 = __importDefault(require("./TotalScore"));
var Car = /** @class */ (function () {
    function Car(id, rideBonus) {
        this._currentStep = 0;
        this._state = CarState_1.default.FREE;
        this._rides = [];
        this._currentRide = null;
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
    Car.prototype.nextStep = function (currentStep, availableRides) {
        this._currentStep = currentStep;
        if (this._state === CarState_1.default.FREE) {
            this.findBestRide(availableRides);
        }
        if (this._state !== CarState_1.default.FREE && this._currentRide !== null) {
            var destinationPoint = void 0;
            // CAR IS WAITING, CHECK IF IT CAN RIDE
            if (this._state === CarState_1.default.WAITING && this._currentStep >= this._currentRide.earliestStart) {
                this._state = CarState_1.default.GOING_TO_ARRIVAL;
            }
            if (this._state !== CarState_1.default.WAITING) {
                // FIND DESTINATION
                if (this._state === CarState_1.default.GOING_TO_ARRIVAL) {
                    destinationPoint = this._currentRide.endPosition;
                }
                else {
                    destinationPoint = this._currentRide.startPosition;
                }
                if (destinationPoint.y !== this._position.y) {
                    if (destinationPoint.y - this._position.y < 0) {
                        this._position.y--;
                    }
                    else {
                        this._position.y++;
                    }
                }
                else if (destinationPoint.x !== this._position.x) {
                    if (destinationPoint.x - this._position.x < 0) {
                        this._position.x--;
                    }
                    else {
                        this._position.x++;
                    }
                }
                if (this._position.isEqual(destinationPoint)) {
                    if (this._state === CarState_1.default.GOING_TO_ARRIVAL) {
                        this._currentRide.isFinished = true;
                        this._state = CarState_1.default.FREE;
                    }
                    else if (this._state === CarState_1.default.GOING_TO_DEPARTURE) {
                        this._state = CarState_1.default.WAITING;
                    }
                }
            }
        }
    };
    Car.prototype.summarize = function () {
        var ridesOrder = "";
        var finishedRides = this._rides.filter(function (ride) { return ride.isFinished; });
        finishedRides.map(function (ride) {
            ridesOrder += (ride.id + " ");
        });
        return finishedRides.length + " " + ridesOrder;
    };
    Car.prototype.findBestRide = function (availableRides) {
        var bestRide = availableRides[0];
        var bestNumberOfPoints = 0;
        var bestRideIndex = -1;
        for (var i = availableRides.length - 1; i >= 0; --i) {
            var ride = availableRides[i];
            if (this._currentStep >= ride.latestFinish) {
                availableRides.splice(i, 1);
                bestRideIndex--;
                continue;
            }
            var numberOfPoints = this.calculatePointsPerStep(ride);
            if (numberOfPoints > bestNumberOfPoints) {
                bestNumberOfPoints = numberOfPoints;
                bestRide = ride;
                bestRideIndex = i;
            }
        }
        if (bestRideIndex >= 0) {
            availableRides.splice(availableRides.indexOf(bestRide), 1);
            this.setRide(bestRide);
        }
    };
    Car.prototype.setRide = function (ride) {
        this._totalScore.addRide(ride, this);
        this._rides.push(ride);
        this._currentRide = ride;
        if (this._position.isEqual(ride.startPosition)) {
            this._state = CarState_1.default.WAITING;
        }
        else {
            this._state = CarState_1.default.GOING_TO_DEPARTURE;
        }
    };
    Car.prototype.calculatePointsPerStep = function (ride) {
        var carDistance = this._position.distance(ride.startPosition);
        var rideDistance = ride.startPosition.distance(ride.endPosition);
        var stepsUntilRideBegin = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        var totalSteps = carDistance + rideDistance + stepsUntilRideBegin;
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

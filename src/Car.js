"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var CarState_1 = __importDefault(require("./CarState"));
var Point_1 = __importDefault(require("./Point"));
var Car = /** @class */ (function () {
    function Car(id) {
        this.distance = 0;
        this._state = CarState_1.default.FREE;
        this._rides = [];
        this._currentRide = null;
        this.id = id;
        this._position = new Point_1.default();
    }
    Object.defineProperty(Car.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "currentRide", {
        get: function () {
            return this._currentRide;
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.setRide = function (ride) {
        this._rides.push(ride);
        this._currentRide = ride;
        if (this._position.isEqual(ride.startPosition)) {
            this._state = CarState_1.default.WAITING;
        }
        else {
            this._state = CarState_1.default.GOING_TO_DEPARTURE;
        }
    };
    Car.prototype.nextStep = function (currentStep) {
        if (this._state !== CarState_1.default.FREE && this.currentRide !== null) {
            var destinationPoint = void 0;
            // CAR IS WAITING, CHECK IF IT CAN RIDE
            if (this._state === CarState_1.default.WAITING && currentStep >= this.currentRide.earliestStart) {
                this._state = CarState_1.default.GOING_TO_ARRIVAL;
            }
            if (this._state !== CarState_1.default.WAITING) {
                // FIND DESTINATION
                if (this._state === CarState_1.default.GOING_TO_ARRIVAL) {
                    destinationPoint = this.currentRide.endPosition;
                }
                else {
                    destinationPoint = this.currentRide.startPosition;
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
                        this.currentRide.isFinished = true;
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
    return Car;
}());
exports.default = Car;

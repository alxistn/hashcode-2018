"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var CarState_1 = __importDefault(require("./CarState"));
var Car = /** @class */ (function () {
    function Car(id) {
        this._state = CarState_1.default.FREE;
        this._row = 0;
        this._column = 0;
        this._rides = [];
        this.distance = 0;
        this.id = id;
    }
    Object.defineProperty(Car.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "row", {
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "column", {
        get: function () {
            return this._column;
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
        if (this.row === ride.startRow && this.column === ride.startColumn) {
            this._state = CarState_1.default.WAITING;
        }
        else {
            this._state = CarState_1.default.GOING_TO_DEPARTURE;
        }
    };
    Car.prototype.nextStep = function (currentStep) {
        if (this._state !== CarState_1.default.FREE && this.currentRide !== null) {
            var destinationRow = void 0;
            var destinationColumn = void 0;
            var currentRide = this.currentRide;
            // CAR IS WAITING, CHECK IF IT CAN RIDE
            if (this._state === CarState_1.default.WAITING && currentStep >= currentRide.earliestStart) {
                this._state = CarState_1.default.GOING_TO_DEPARTURE;
            }
            if (this._state !== CarState_1.default.WAITING) {
                // FIND DESTINATION
                if (this._state === CarState_1.default.GOING_TO_ARRIVAL) {
                    destinationRow = currentRide.endRow;
                    destinationColumn = currentRide.endColumn;
                }
                else {
                    destinationRow = currentRide.startRow;
                    destinationColumn = currentRide.startColumn;
                }
                if (destinationRow !== this.row) {
                    if (destinationRow - this.row < 0) {
                        this._row--;
                    }
                    else {
                        this._row++;
                    }
                }
                else if (destinationColumn !== this.column) {
                    if (destinationColumn - this.column < 0) {
                        this._column--;
                    }
                    else {
                        this._column++;
                    }
                }
                if (destinationColumn === this.column && destinationRow === this.row) {
                    if (this._state === CarState_1.default.GOING_TO_ARRIVAL) {
                        currentRide.isFinished = true;
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
        this._rides.filter(function (x) { return x.isFinished; }).map(function (x) {
            ridesOrder += (x.id + " ");
        });
        return this._rides.length + " " + ridesOrder;
    };
    return Car;
}());
exports.default = Car;

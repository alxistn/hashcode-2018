"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCar_1 = __importDefault(require("../AbstractCar"));
var CarState_1 = __importDefault(require("../CarState"));
var SimulationCar = /** @class */ (function (_super) {
    __extends(SimulationCar, _super);
    function SimulationCar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._state = CarState_1.default.FREE;
        _this._currentRide = null;
        return _this;
    }
    SimulationCar.prototype.nextStep = function (currentStep, availableRides) {
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
                        this._state = CarState_1.default.FREE;
                    }
                    else if (this._state === CarState_1.default.GOING_TO_DEPARTURE) {
                        this._state = CarState_1.default.WAITING;
                    }
                }
            }
        }
    };
    SimulationCar.prototype.handleImpossibleRide = function (availableRides, index, bestRideIndex) {
        availableRides.splice(index, 1);
        bestRideIndex--;
        return bestRideIndex;
    };
    SimulationCar.prototype.setRide = function (availableRides, ride) {
        availableRides.splice(availableRides.indexOf(ride), 1);
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
    return SimulationCar;
}(AbstractCar_1.default));
exports.default = SimulationCar;

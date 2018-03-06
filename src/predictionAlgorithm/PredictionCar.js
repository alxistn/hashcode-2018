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
var PredictionCar = /** @class */ (function (_super) {
    __extends(PredictionCar, _super);
    function PredictionCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictionCar.prototype.predictRides = function (availableRides) {
        var running = true;
        while (running) {
            if (!this.findBestRide(availableRides)) {
                running = false;
            }
        }
        this.summarize();
    };
    PredictionCar.prototype.handleImpossibleRide = function (availableRides, index, bestRideIndex) {
        return bestRideIndex;
    };
    PredictionCar.prototype.setRide = function (availableRides, ride) {
        availableRides.splice(availableRides.indexOf(ride), 1);
        this._totalScore.addRide(ride, this);
        this._rides.push(ride);
        this.updateCurrentStep(ride);
    };
    PredictionCar.prototype.updateCurrentStep = function (ride) {
        var carDistance = this._position.distance(ride.startPosition);
        var rideDistance = ride.startPosition.distance(ride.endPosition);
        var stepsUntilRideBegin = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        this._currentStep += (carDistance + rideDistance + stepsUntilRideBegin) - 1;
    };
    return PredictionCar;
}(AbstractCar_1.default));
exports.default = PredictionCar;

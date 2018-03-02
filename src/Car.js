"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var CarState_1 = __importDefault(require("./CarState"));
var Car = /** @class */ (function () {
    function Car(id) {
        this.state = CarState_1.default.FREE;
        this.row = 0;
        this.column = 0;
        this.rides = [];
        this.distance = 0;
        this.id = id;
    }
    Car.prototype.setRide = function (ride) {
        this.rides.push(ride);
        this.currentRide = ride;
        if (this.row === ride.startRow && this.column === ride.startColumn) {
            this.state = CarState_1.default.WAITING;
        }
        else {
            this.state = CarState_1.default.GOING_TO_DEPARTURE;
        }
    };
    Car.prototype.summarize = function () {
        var ridesOrder = "";
        this.rides.filter(function (x) { return x.isFinished; }).map(function (x) {
            ridesOrder += (x.id + " ");
        });
        return this.rides.length + " " + ridesOrder;
    };
    return Car;
}());
exports.default = Car;

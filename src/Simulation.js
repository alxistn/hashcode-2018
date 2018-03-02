"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var Car_1 = __importDefault(require("./Car"));
var Ride_1 = __importDefault(require("./Ride"));
var CarState_1 = __importDefault(require("./CarState"));
var Simulation = /** @class */ (function () {
    function Simulation(fileName) {
        this.rides = []; // the list of rides for the simulation
        this.cars = [];
        this.fileName = fileName;
        var fileContent = fs.readFileSync("./input/" + this.fileName + ".in", "utf-8");
        this.data = fileContent.split('\n');
        var metaSimulation = this.data[0].split(' ');
        this.rows = parseInt(metaSimulation[0]);
        this.columns = parseInt(metaSimulation[1]);
        this.totalVehicles = parseInt(metaSimulation[2]);
        this.totalRides = parseInt(metaSimulation[3]);
        this.bonus = parseInt(metaSimulation[4]);
        this.steps = parseInt(metaSimulation[5]);
    }
    Simulation.prototype.generateRides = function () {
        var tmp;
        for (var i = 1, l = this.data.length; i < l; i++) {
            tmp = this.data[i].split(' ');
            if (tmp.length === 6) {
                this.rides.push(new (Ride_1.default.bind.apply(Ride_1.default, [void 0, i - 1].concat(tmp)))());
            }
        }
    };
    Simulation.prototype.setRides = function (step) {
        for (var i = this.rides.length - 1; i >= 0; i--) {
            if (this.rides[i].latestFinish < step) {
                break;
            }
            var filteredCars = this.cars.filter(function (c) { return c.state === CarState_1.default.FREE; });
            var bestCar = null;
            for (var j = 0; j < filteredCars.length; j++) {
                filteredCars[j].distance = Simulation.calculateIteration(filteredCars[j].row, filteredCars[j].column, this.rides[i].startRow, this.rides[i].startColumn);
                if (bestCar === null || filteredCars[j].distance < bestCar.distance)
                    bestCar = filteredCars[j];
            }
            if (bestCar) {
                bestCar.setRide(this.rides[i]);
                this.rides.splice(i, 1);
            }
            else {
                break;
            }
        }
    };
    Simulation.prototype.output = function () {
        var file = "";
        for (var i = 0; i < this.cars.length; i++)
            file += this.cars[i].summarize() + "\n";
        fs.writeFileSync("output/" + this.fileName + ".ou", file);
    };
    Simulation.calculateIteration = function (startRow, startColumn, endRow, endColumn) {
        var finRow;
        var finColumn;
        if (startRow < endRow) {
            finRow = endRow - startRow;
        }
        else if (endRow < startRow) {
            finRow = startRow - endRow;
        }
        else {
            finRow = 0;
        }
        if (startColumn < endColumn) {
            finColumn = endColumn - startColumn;
        }
        else if (endColumn < startColumn) {
            finColumn = startColumn - endColumn;
        }
        else {
            finColumn = 0;
        }
        return finRow + finColumn;
    };
    Simulation.prototype.start = function () {
        // RIDING LOOP
        var cars = [];
        for (var i = 0; i < this.totalVehicles; i++) {
            cars.push(new Car_1.default(i));
        }
        for (var step = 0; step < this.steps; ++step) {
            this.setRides(step);
            for (var j = 0; j < this.cars.length; ++j) {
                var currentCar = this.cars[j];
                if (currentCar.state !== CarState_1.default.FREE && currentCar.currentRide !== null) {
                    var destinationRow = void 0;
                    var destinationColumn = void 0;
                    var currentRide = currentCar.currentRide;
                    // CAR IS WAITING, CHECK IF IT CAN RIDE
                    if (currentCar.state === CarState_1.default.WAITING && step >= currentRide.earliestStart) {
                        currentCar.state = CarState_1.default.GOING_TO_DEPARTURE;
                    }
                    if (currentCar.state !== CarState_1.default.WAITING) {
                        // FIND DESTINATION
                        if (currentCar.state === CarState_1.default.GOING_TO_ARRIVAL) {
                            destinationRow = currentRide.endRow;
                            destinationColumn = currentRide.endColumn;
                        }
                        else {
                            destinationRow = currentRide.startRow;
                            destinationColumn = currentRide.startColumn;
                        }
                        if (destinationRow !== currentCar.row) {
                            if (destinationRow - currentCar.row < 0) {
                                currentCar.row--;
                            }
                            else {
                                currentCar.row++;
                            }
                        }
                        else if (destinationColumn !== currentCar.column) {
                            if (destinationColumn - currentCar.column < 0) {
                                currentCar.column--;
                            }
                            else {
                                currentCar.column++;
                            }
                        }
                        if (destinationColumn === currentCar.column && destinationRow === currentCar.row) {
                            if (currentCar.state === CarState_1.default.GOING_TO_ARRIVAL) {
                                currentRide.isFinished = true;
                                currentCar.state = CarState_1.default.FREE;
                            }
                            else if (currentCar.state === CarState_1.default.GOING_TO_DEPARTURE) {
                                currentCar.state = CarState_1.default.WAITING;
                            }
                        }
                    }
                }
            }
        }
    };
    return Simulation;
}());
exports.default = Simulation;

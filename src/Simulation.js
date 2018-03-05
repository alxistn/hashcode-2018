"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var Car_1 = __importDefault(require("./Car"));
var Ride_1 = __importDefault(require("./Ride"));
var CarState_1 = __importDefault(require("./CarState"));
var Simulation = /** @class */ (function () {
    function Simulation(fileName) {
        this.currentStep = 0;
        this.availableRides = [];
        this.cars = [];
        this.fileName = fileName;
        var fileContent = fs.readFileSync("./input/" + this.fileName + ".in", "utf-8");
        this.data = fileContent.split("\n");
        var metaSimulation = this.data[0].split(" ");
        this.rows = parseInt(metaSimulation[0], 10);
        this.columns = parseInt(metaSimulation[1], 10);
        this.totalVehicles = parseInt(metaSimulation[2], 10);
        this.totalRides = parseInt(metaSimulation[3], 10);
        this.bonus = parseInt(metaSimulation[4], 10);
        this.maximumSteps = parseInt(metaSimulation[5], 10);
        for (var i = 0; i < this.totalVehicles; i++) {
            this.cars.push(new Car_1.default(i));
        }
    }
    Simulation.prototype.generateRides = function () {
        for (var i = 1, l = this.data.length; i < l; ++i) {
            var rideDescription = this.data[i].split(" ");
            if (rideDescription.length === 6) {
                this.availableRides.push(new (Ride_1.default.bind.apply(Ride_1.default, [void 0, i - 1].concat(rideDescription)))());
            }
        }
    };
    Simulation.prototype.setRides = function () {
        var filteredCars = this.cars.filter(function (c) { return c.state === CarState_1.default.FREE; });
        if (!filteredCars.length) {
            return;
        }
        for (var i = this.availableRides.length - 1; i >= 0; --i) {
            var ride = this.availableRides[i];
            var bestCar = null;
            var bestCarIndex = 0;
            for (var j = 0, l = filteredCars.length; j < l; ++j) {
                var filteredCar = filteredCars[j];
                filteredCar.distance = filteredCar.position.distance(ride.startPosition);
                if (bestCar === null || filteredCar.distance < bestCar.distance) {
                    bestCar = filteredCar;
                    bestCarIndex = j;
                }
            }
            if (bestCar) {
                bestCar.setRide(ride);
                this.availableRides.splice(i, 1);
                filteredCars.splice(bestCarIndex, 1);
            }
            else {
                break;
            }
            if (!filteredCars.length) {
                break;
            }
        }
    };
    Simulation.prototype.output = function () {
        var file = "";
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            file += car.summarize() + "\n";
        }
        fs.writeFileSync("output/" + this.fileName + ".ou", file);
    };
    Simulation.prototype.start = function () {
        while (this.currentStep < this.maximumSteps) {
            this.setRides();
            for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
                var car = _a[_i];
                car.nextStep(this.currentStep);
            }
            this.currentStep++;
        }
    };
    return Simulation;
}());
exports.default = Simulation;

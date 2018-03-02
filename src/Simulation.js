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
        this.rides = []; // the list of rides for the simulation
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
        this.steps = parseInt(metaSimulation[5], 10);
        for (var i = 0; i < this.totalVehicles; i++) {
            this.cars.push(new Car_1.default(i));
        }
    }
    Simulation.prototype.generateRides = function () {
        for (var i = 1, l = this.data.length; i < l; i++) {
            var tmp = this.data[i].split(" ");
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
            for (var _i = 0, filteredCars_1 = filteredCars; _i < filteredCars_1.length; _i++) {
                var filteredCar = filteredCars_1[_i];
                filteredCar.distance = filteredCar.position.distance(this.rides[i].startPosition);
                if (bestCar === null || filteredCar.distance < bestCar.distance) {
                    bestCar = filteredCar;
                }
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
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            file += car.summarize() + "\n";
        }
        fs.writeFileSync("output/" + this.fileName + ".ou", file);
    };
    Simulation.prototype.start = function () {
        for (var step = 0; step < this.steps; ++step) {
            this.setRides(step);
            for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
                var car = _a[_i];
                car.nextStep(step);
            }
        }
    };
    return Simulation;
}());
exports.default = Simulation;

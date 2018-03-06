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
var Ride_1 = __importDefault(require("./Ride"));
var AbstractAlgorithm = /** @class */ (function () {
    function AbstractAlgorithm(fileName) {
        this._availableRides = [];
        this._fileName = fileName;
        var fileContent = fs.readFileSync("./input/" + this._fileName + ".in", "utf-8");
        this._data = fileContent.split("\n");
        var metaSimulation = this._data[0].split(" ");
        this._rows = parseInt(metaSimulation[0], 10);
        this._columns = parseInt(metaSimulation[1], 10);
        this._totalVehicles = parseInt(metaSimulation[2], 10);
        this._totalRides = parseInt(metaSimulation[3], 10);
        this._bonus = parseInt(metaSimulation[4], 10);
        this._maximumSteps = parseInt(metaSimulation[5], 10);
    }
    AbstractAlgorithm.prototype.init = function () {
        this.generateCars();
        this.generateRides();
    };
    AbstractAlgorithm.prototype.generateRides = function () {
        for (var i = 1, l = this._data.length; i < l; ++i) {
            var rideDescription = this._data[i].split(" ");
            if (rideDescription.length === 6) {
                this._availableRides.push(new (Ride_1.default.bind.apply(Ride_1.default, [void 0, i - 1].concat(rideDescription)))());
            }
        }
    };
    return AbstractAlgorithm;
}());
exports.default = AbstractAlgorithm;

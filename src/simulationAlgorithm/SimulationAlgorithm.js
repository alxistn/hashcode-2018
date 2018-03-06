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
var AbstractAlgorithm_1 = __importDefault(require("../AbstractAlgorithm"));
var SimulationCar_1 = __importDefault(require("./SimulationCar"));
var SimulationAlgorithm = /** @class */ (function (_super) {
    __extends(SimulationAlgorithm, _super);
    function SimulationAlgorithm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._cars = [];
        _this._currentStep = 0;
        return _this;
    }
    SimulationAlgorithm.prototype.start = function () {
        while (this._currentStep < this._maximumSteps) {
            for (var _i = 0, _a = this._cars; _i < _a.length; _i++) {
                var car = _a[_i];
                car.nextStep(this._currentStep, this._availableRides);
            }
            this._currentStep++;
        }
        this.output();
    };
    SimulationAlgorithm.prototype.generateCars = function () {
        for (var i = 0; i < this._totalVehicles; i++) {
            this._cars.push(new SimulationCar_1.default(i, this._bonus));
        }
    };
    SimulationAlgorithm.prototype.output = function () {
        var file = "";
        for (var _i = 0, _a = this._cars; _i < _a.length; _i++) {
            var car = _a[_i];
            file += car.summarize() + "\n";
        }
        fs.writeFileSync("output/" + this._fileName + ".ou", file);
    };
    return SimulationAlgorithm;
}(AbstractAlgorithm_1.default));
exports.default = SimulationAlgorithm;

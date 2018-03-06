"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var PredictionAlgorithm_1 = __importDefault(require("./predictionAlgorithm/PredictionAlgorithm"));
var SimulationAlgorithm_1 = __importDefault(require("./simulationAlgorithm/SimulationAlgorithm"));
var TotalScore_1 = __importDefault(require("./TotalScore"));
var fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];
console.log("\x1b[35m%s\x1b[0m", "----------------------------------------------------\n" +
    "--------------- SIMULATION ALGORITHM ---------------\n" +
    "----------------------------------------------------");
var totalScore = TotalScore_1.default.Instance;
for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
    var fileName = fileNames_1[_i];
    totalScore.setFile(fileName);
    var simulationAlgorithm = new SimulationAlgorithm_1.default(fileName);
    simulationAlgorithm.start();
    totalScore.printCurrentFileScore();
}
totalScore.printTotalScore();
console.log("\x1b[35m%s\x1b[0m", "----------------------------------------------------\n" +
    "--------------- PREDICTION ALGORITHM ---------------\n" +
    "----------------------------------------------------");
TotalScore_1.default.reset();
totalScore = TotalScore_1.default.Instance;
for (var _a = 0, fileNames_2 = fileNames; _a < fileNames_2.length; _a++) {
    var fileName = fileNames_2[_a];
    totalScore.setFile(fileName);
    var predictionAlgorithm = new PredictionAlgorithm_1.default(fileName);
    predictionAlgorithm.output();
    totalScore.printCurrentFileScore();
}
totalScore.printTotalScore();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var RideBatch_1 = __importDefault(require("./RideBatch"));
var TotalScore_1 = __importDefault(require("./TotalScore"));
var fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];
var totalScore = TotalScore_1.default.Instance;
for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
    var fileName = fileNames_1[_i];
    totalScore.setFile(fileName);
    var rideBatch = new RideBatch_1.default(fileName);
    rideBatch.output();
    totalScore.printCurrentFileScore();
}
totalScore.printTotalScore();

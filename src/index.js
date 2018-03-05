"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Simulation_1 = __importDefault(require("./Simulation"));
var fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];
for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
    var fileName = fileNames_1[_i];
    var simulation = new Simulation_1.default(fileName);
    simulation.start();
}

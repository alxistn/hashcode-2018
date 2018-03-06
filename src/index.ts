import PredictionAlgorithm from "./predictionAlgorithm/PredictionAlgorithm";
import SimulationAlgorithm from "./simulationAlgorithm/SimulationAlgorithm";
import TotalScore from "./TotalScore";

const fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];

console.log("\x1b[35m%s\x1b[0m",
    "----------------------------------------------------\n" +
    "--------------- SIMULATION ALGORITHM ---------------\n" +
    "----------------------------------------------------");
let totalScore = TotalScore.Instance;

for (const fileName of fileNames) {
    totalScore.setFile(fileName);
    const simulationAlgorithm = new SimulationAlgorithm(fileName);
    simulationAlgorithm.start();
    totalScore.printCurrentFileScore();
}

totalScore.printTotalScore();

console.log("\x1b[35m%s\x1b[0m",
    "----------------------------------------------------\n" +
    "--------------- PREDICTION ALGORITHM ---------------\n" +
    "----------------------------------------------------");
TotalScore.reset();
totalScore = TotalScore.Instance;

for (const fileName of fileNames) {
    totalScore.setFile(fileName);
    const predictionAlgorithm = new PredictionAlgorithm(fileName);
    predictionAlgorithm.output();
    totalScore.printCurrentFileScore();
}

totalScore.printTotalScore();

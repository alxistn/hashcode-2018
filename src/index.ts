import RideBatch from "./RideBatch";
import TotalScore from "./TotalScore";

const fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];

const totalScore = TotalScore.Instance;

for (const fileName of fileNames) {
    totalScore.setFile(fileName);
    const rideBatch = new RideBatch(fileName);
    rideBatch.output();
    totalScore.printCurrentFileScore();
}

totalScore.printTotalScore();

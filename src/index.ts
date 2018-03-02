import Simulation from "./Simulation";

const fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];

for (let i = 0 ; i < fileNames.length ; ++i) {
    var simulation = new Simulation(fileNames[i]);
    simulation.generateRides();
    simulation.start();
    simulation.output();
}
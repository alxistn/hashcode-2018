import Simulation from "./Simulation";

const fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];

for (const fileName of fileNames) {
    const simulation = new Simulation(fileName);
    simulation.generateRides();
    simulation.start();
    simulation.output();
}
declare function require(name: string);
const fs = require('fs');

import Car from "./Car";
import Ride from "./Ride";

import CarState from "./CarState";

export default class Simulation {
    fileName: string;
    rows: number; // number of rows of the grid
    columns: number; // number of columns of the grid
    totalVehicles: number; // number of vehicles in the fleet
    totalRides: number; // number of rides
    bonus: number; // per-ride bonus
    steps: number; // number of steps in the simulation
    rides: Ride[] = []; // the list of rides for the simulation
    cars: Car[] = [];
    data: string[];  // the data input formatted

    constructor(fileName: string) {
        this.fileName = fileName;

        let fileContent = fs.readFileSync(`./input/${this.fileName}.in`, "utf-8");

        this.data = fileContent.split('\n');

        let metaSimulation = this.data[0].split(' ');

        this.rows = parseInt(metaSimulation[0]);
        this.columns = parseInt(metaSimulation[1]);
        this.totalVehicles = parseInt(metaSimulation[2]);
        this.totalRides = parseInt(metaSimulation[3]);
        this.bonus = parseInt(metaSimulation[4]);
        this.steps = parseInt(metaSimulation[5]);
    }

    generateRides() {
        let tmp;

        for (let i = 1, l = this.data.length; i < l; i++) {
            tmp = this.data[i].split(' ');

            if (tmp.length === 6) {
                this.rides.push(new Ride(i - 1, ...tmp));
            }
        }
    }

    setRides(step) {
        for (let i = this.rides.length - 1; i >= 0; i--) {
            if (this.rides[i].latestFinish < step) {
                break;
            }

            let filteredCars = this.cars.filter(c => c.state === CarState.FREE);
            let bestCar = null;
            for (let j = 0; j < filteredCars.length; j++) {
                filteredCars[j].distance = Simulation.calculateIteration(filteredCars[j].row, filteredCars[j].column, this.rides[i].startRow, this.rides[i].startColumn);
                if (bestCar === null || filteredCars[j].distance < bestCar.distance)
                    bestCar = filteredCars[j]
            }
            if (bestCar) {
                bestCar.setRide(this.rides[i]);
                this.rides.splice(i, 1);
            } else {
                break;
            }
        }
    }

    output() {
        let file = "";
        for (let i = 0; i < this.cars.length; i++)
            file += this.cars[i].summarize() + "\n";

        fs.writeFileSync(`output/${this.fileName}.ou`, file);
    }

    static calculateIteration(startRow: number, startColumn:number, endRow: number, endColumn: number) {
        let finRow;
        let finColumn;
        if (startRow < endRow) {
            finRow = endRow - startRow;
        } else if (endRow < startRow) {
            finRow = startRow - endRow;
        } else {
            finRow = 0;
        }
        if (startColumn < endColumn) {
            finColumn = endColumn - startColumn;
        } else if (endColumn < startColumn) {
            finColumn = startColumn - endColumn;
        } else {
            finColumn = 0;
        }
        return finRow + finColumn;
    }

    start() {
        // RIDING LOOP

        let cars = [];
        for (let i = 0; i < this.totalVehicles; i++) {
            cars.push(new Car(i));
        }

        for (let step = 0; step < this.steps; ++step) {
            this.setRides(step);
            for (let j = 0; j < this.cars.length; ++j) {
                let currentCar = this.cars[j];

                if (currentCar.state !== CarState.FREE && currentCar.currentRide !== null) {
                    let destinationRow;
                    let destinationColumn;
                    let currentRide = currentCar.currentRide;

                    // CAR IS WAITING, CHECK IF IT CAN RIDE
                    if (currentCar.state === CarState.WAITING && step >= currentRide.earliestStart) {
                        currentCar.state = CarState.GOING_TO_DEPARTURE;
                    }

                    if (currentCar.state !== CarState.WAITING) {
                        // FIND DESTINATION
                        if (currentCar.state === CarState.GOING_TO_ARRIVAL) {
                            destinationRow = currentRide.endRow;
                            destinationColumn = currentRide.endColumn;
                        } else {
                            destinationRow = currentRide.startRow;
                            destinationColumn = currentRide.startColumn;
                        }

                        if (destinationRow !== currentCar.row) {
                            if (destinationRow - currentCar.row < 0) {
                                currentCar.row--;
                            } else {
                                currentCar.row++;
                            }
                        } else if (destinationColumn !== currentCar.column) {
                            if (destinationColumn - currentCar.column < 0) {
                                currentCar.column--;
                            } else {
                                currentCar.column++;
                            }
                        }

                        if (destinationColumn === currentCar.column && destinationRow === currentCar.row) {
                            if (currentCar.state === CarState.GOING_TO_ARRIVAL) {
                                currentRide.isFinished = true;
                                currentCar.state = CarState.FREE;
                            } else if (currentCar.state === CarState.GOING_TO_DEPARTURE) {
                                currentCar.state = CarState.WAITING;
                            }
                        }
                    }
                }
            }
        }
    }
}

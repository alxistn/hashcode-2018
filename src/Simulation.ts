declare function require(name: string);

import Ride from "./Ride";
const fs = require('fs');

export default class Simulation {
    rows: number; // number of rows of the grid
    columns: number; // number of columns of the grid
    totalVehicles: number; // number of vehicles in the fleet
    totalRides: number; // number of rides
    bonus: number; // per-ride bonus
    steps: number; // number of steps in the simulation
    rides: Ride[] = []; // the list of rides for the simulation
    data: string[];  // the data input formatted

    constructor(fileName: string) {
        let fileContent = fs.readFileSync(`./input/${fileName}.in`, "utf-8");

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

        console.log("generateRides");

        for (let i = 1, l = this.data.length; i < l; i++) {
            tmp = this.data[i].split(' ');

            if (tmp.length === 6) {
                this.rides.push(new Ride(i - 1, ...tmp));
            }
        }
    }

    // setRides(step) {
    //     for (let i = rides.length - 1; i >= 0; i--) {
    //         if (rides[i].latestFinish < step) {
    //             break;
    //         }
    //
    //         let filteredCars = cars.filter(c => c.state === 'free');
    //         let bestCar = null;
    //         for (let j = 0; j < filteredCars.length; j++) {
    //             filteredCars[j].distance = calculateIteration(filteredCars[j].row, filteredCars[j].column, rides[i].startRow, rides[i].startColumn);
    //             if (bestCar === null || filteredCars[j].distance < bestCar.distance)
    //                 bestCar = filteredCars[j]
    //         }
    //         if (bestCar) {
    //             bestCar.setRide(rides[i]);
    //             rides.splice(i, 1);
    //         } else {
    //             break;
    //         }
    //     }
    // }
    //
    // output() {
    //     let file = "";
    //     for (let i = 0; i < cars.length; i++)
    //         file += cars[i].summarize() + "\n";
    //
    //     console.log(fileName);
    //     fs.writeFileSync(`${fileName}.ou`, file);
    // }
    //
    // static calculateIteration({startRow, startColumn, endRow, endColumn}) {
    //     let finRow;
    //     let finColumn;
    //     if (startRow < endRow) {
    //         finRow = endRow - startRow;
    //     } else if (endRow < startRow) {
    //         finRow = startRow - endRow;
    //     } else {
    //         finRow = 0;
    //     }
    //     if (startColumn < endColumn) {
    //         finColumn = endColumn - startColumn;
    //     } else if (endColumn < startColumn) {
    //         finColumn = startColumn - endColumn;
    //     } else {
    //         finColumn = 0;
    //     }
    //     return finRow + finColumn;
    // }
    //
    // start() {
    //     // RIDING LOOP
    //     for (let step = 0; step < steps; ++step) {
    //         this.setRides(step);
    //         for (let j = 0; j < cars.length; ++j) {
    //             let currentCar = cars[j];
    //
    //             if (currentCar.state !== "free" && currentCar.currentRide !== null) {
    //                 let destinationRow;
    //                 let destinationColumn;
    //                 let currentRide = currentCar.currentRide;
    //
    //                 // CAR IS WAITING, CHECK IF IT CAN RIDE
    //                 if (currentCar.state === "waiting" && step >= currentRide.earliestStart) {
    //                     currentCar.state = "riding";
    //                 }
    //
    //                 if (currentCar.state !== "waiting" && currentCar.state !== "free") {
    //                     // FIND DESTINATION
    //                     if (currentCar.state === "riding") {
    //                         destinationRow = currentRide.endRow;
    //                         destinationColumn = currentRide.endColumn;
    //                     } else if (currentCar.state === "riding4theride") {
    //                         destinationRow = currentRide.startRow;
    //                         destinationColumn = currentRide.startColumn;
    //                     }
    //
    //                     if (destinationRow !== currentCar.row) {
    //                         if (destinationRow - currentCar.row < 0) {
    //                             currentCar.row--;
    //                         } else {
    //                             currentCar.row++;
    //                         }
    //                     } else if (destinationColumn !== currentCar.column) {
    //                         if (destinationColumn - currentCar.column < 0) {
    //                             currentCar.column--;
    //                         } else {
    //                             currentCar.column++;
    //                         }
    //                     }
    //
    //                     if (destinationColumn === currentCar.column && destinationRow === currentCar.row) {
    //                         if (currentCar.state === "riding") {
    //                             currentRide.isFinished = true;
    //                             currentCar.state = "free";
    //                         } else if (currentCar.state === "riding4theride") {
    //                             currentCar.state = "waiting";
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}

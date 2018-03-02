"use strict";
exports.__esModule = true;
var Simulation_1 = require("./Simulation");
var fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];
for (var i = 0; i < fileNames.length; ++i) {
    var simulation = new Simulation_1["default"](fileNames[i]);
    simulation.generateRides();
    console.log(simulation);
    // let cars = [];
    // for (let i = 0; i < totalVehicles; i++) {
    //     cars.push(new Car(i));
    // }
    // output();
}
//
// let fileNames = ["a_example", "b_should_be_easy", "c_no_hurry", "d_metropolis", "e_high_bonus"];
// for (let i = 0 ; i < fileNames.length ; ++i) {
//     let fileName = fileNames[i];
//
//     let data = fs.readFileSync(`./input/${fileName}.in`, "utf-8");
//
//     let formated = data.split('\n');
//
//     let mapInfo = formated[0].split(' ');
//
//     let rows = parseInt(mapInfo[0]); // number of rows of the grid
//     let columns = parseInt(mapInfo[1]); // number of columns of the grid
//     let totalVehicles = parseInt(mapInfo[2]); // number of vehicles in the fleet
//     let totalRides = parseInt(mapInfo[3]); // number of rides
//     let bonus = parseInt(mapInfo[4]); // per-ride bonus
//     let steps = parseInt(mapInfo[5]); // number of steps in the simulation
//
//     let rides: Ride[] = [];
//     for (let i = 1; i < formated.length; i++) {
//         let tmp = formated[i].split(' ');
//
//         if (tmp.length === 6) {
//             rides.push(new Ride(i - 1, tmp));
//         }
//     }
//
//     let outputRides = [];
//     for (let i = 0; i < totalVehicles; i++) {
//         outputRides.push({
//             isRiding: false,
//             rides: []
//         });
//     }
//
//     let cars: Car[] = [];
//     for (let i = 0; i < totalVehicles; i++) {
//         cars.push(new Car(i));
//     }
//
//     function setRides() {
//         for (let i = 0; i < totalRides; i++) {
//             if (rides[i].isSet === false) {
//                 let bestCar = null;
//                 for (let j = 0; j < filteredCars.length; j++) {
//                     filteredCars[j].distance = calculateIteration(filteredCars[j].row, filteredCars[j].column, rides[i].startRow, rides[i].startColumn);
//                     if (bestCar === null || filteredCars[j].distance < bestCar.distance)
//                         bestCar = filteredCars[j]
//                 }
//                 if (bestCar) {
//                     rides[i].isSet = true;
//                     bestCar.setRide(rides[i]);
//                 }
//             }
//         }
//     }
//
//     function setRides(step) {
//         for (let i = rides.length - 1; i >= 0; i--) {
//             if (rides[i].latestFinish < step) {
//                 break;
//             }
//
//             let filteredCars = cars.filter(c => c.state === 'free');
//             let bestCar = null;
//             for (let j = 0; j < filteredCars.length; j++) {
//                 filteredCars[j].distance = calculateIteration(filteredCars[j].row, filteredCars[j].column, rides[i].startRow, rides[i].startColumn);
//                 if (bestCar === null || filteredCars[j].distance < bestCar.distance)
//                     bestCar = filteredCars[j]
//             }
//             if (bestCar) {
//                 rides[i].isSet = true;
//                 bestCar.setRide(rides[i]);
//             }
//
//             let car = cars.find(c => c.state === 'free');
//             if (car) {
//                 car.setRide(rides[i]);
//                 rides.splice(i, 1);
//             } else {
//                 break;
//             }
//         }
//     }
//
//     function output() {
//         let file = "";
//         for (let i = 0; i < cars.length; i++)
//             file += cars[i].summarize() + "\n";
//
//         console.log(fileName);
//         fs.writeFileSync(`output/${fileName}.ou`, file);
//     }
//
//     function calculateIteration({startRow, startColumn, endRow, endColumn}) {
//         let finRow;
//         let finColumn;
//         if (startRow < endRow) {
//             finRow = endRow - startRow;
//         } else if (endRow < startRow) {
//             finRow = startRow - endRow;
//         } else {
//             finRow = 0;
//         }
//         if (startColumn < endColumn) {
//             finColumn = endColumn - startColumn;
//         } else if (endColumn < startColumn) {
//             finColumn = startColumn - endColumn;
//         } else {
//             finColumn = 0;
//         }
//         return finRow + finColumn;
//     }
//
//     // RIDING LOOP
//     for (let step = 0; step < steps; ++step) {
//         setRides(step);
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
//     output();
// }

"use strict";
var fs = require('fs');
var Simulation = (function () {
    function Simulation(fileName) {
        var data = fs.readFileSync("./" + fileName + ".in", "utf-8");
        data = data.split('\n');
        var metaSimulation = data[0].split(' ');
        this.rows = parseInt(metaSimulation[0]);
        this.columns = parseInt(metaSimulation[1]);
        this.totalVehicles = parseInt(metaSimulation[2]);
        this.totalRides = parseInt(metaSimulation[3]);
        this.bonus = parseInt(metaSimulation[4]);
        this.steps = parseInt(metaSimulation[5]);
    }
    Simulation.prototype.generateRides = function () {
        var rides = [];
        for (var i = 1; i < formated.length; i++) {
            var tmp = formated[i].split(' ');
            if (tmp.length === 6) {
                rides.push({
                    id: i - 1,
                    startRow: parseInt(tmp[0]),
                    startColumn: parseInt(tmp[1]),
                    endRow: parseInt(tmp[2]),
                    endColumn: parseInt(tmp[3]),
                    earliestStart: parseInt(tmp[4]),
                    latestFinish: parseInt(tmp[5]),
                    isSet: false,
                    isFinished: false
                });
            }
        }
    };
    Simulation.prototype.setRides = function (step) {
        for (var i = rides.length - 1; i >= 0; i--) {
            if (rides[i].latestFinish < step) {
                break;
            }
            var filteredCars = cars.filter(function (c) { return c.state === 'free'; });
            var bestCar = null;
            for (var j = 0; j < filteredCars.length; j++) {
                filteredCars[j].distance = calculateIteration(filteredCars[j].row, filteredCars[j].column, rides[i].startRow, rides[i].startColumn);
                if (bestCar === null || filteredCars[j].distance < bestCar.distance)
                    bestCar = filteredCars[j];
            }
            if (bestCar) {
                bestCar.setRide(rides[i]);
                rides.splice(i, 1);
            }
            else {
                break;
            }
        }
    };
    Simulation.prototype.output = function () {
        var file = "";
        for (var i = 0; i < cars.length; i++)
            file += cars[i].summarize() + "\n";
        console.log(fileName);
        fs.writeFileSync(fileName + ".ou", file);
    };
    Simulation.calculateIteration = function (_a) {
        var startRow = _a.startRow, startColumn = _a.startColumn, endRow = _a.endRow, endColumn = _a.endColumn;
        var finRow;
        var finColumn;
        if (startRow < endRow) {
            finRow = endRow - startRow;
        }
        else if (endRow < startRow) {
            finRow = startRow - endRow;
        }
        else {
            finRow = 0;
        }
        if (startColumn < endColumn) {
            finColumn = endColumn - startColumn;
        }
        else if (endColumn < startColumn) {
            finColumn = startColumn - endColumn;
        }
        else {
            finColumn = 0;
        }
        return finRow + finColumn;
    };
    Simulation.prototype.start = function () {
        // RIDING LOOP
        for (var step = 0; step < steps; ++step) {
            this.setRides(step);
            for (var j = 0; j < cars.length; ++j) {
                var currentCar = cars[j];
                if (currentCar.state !== "free" && currentCar.currentRide !== null) {
                    var destinationRow = void 0;
                    var destinationColumn = void 0;
                    var currentRide = currentCar.currentRide;
                    // CAR IS WAITING, CHECK IF IT CAN RIDE
                    if (currentCar.state === "waiting" && step >= currentRide.earliestStart) {
                        currentCar.state = "riding";
                    }
                    if (currentCar.state !== "waiting" && currentCar.state !== "free") {
                        // FIND DESTINATION
                        if (currentCar.state === "riding") {
                            destinationRow = currentRide.endRow;
                            destinationColumn = currentRide.endColumn;
                        }
                        else if (currentCar.state === "riding4theride") {
                            destinationRow = currentRide.startRow;
                            destinationColumn = currentRide.startColumn;
                        }
                        if (destinationRow !== currentCar.row) {
                            if (destinationRow - currentCar.row < 0) {
                                currentCar.row--;
                            }
                            else {
                                currentCar.row++;
                            }
                        }
                        else if (destinationColumn !== currentCar.column) {
                            if (destinationColumn - currentCar.column < 0) {
                                currentCar.column--;
                            }
                            else {
                                currentCar.column++;
                            }
                        }
                        if (destinationColumn === currentCar.column && destinationRow === currentCar.row) {
                            if (currentCar.state === "riding") {
                                currentRide.isFinished = true;
                                currentCar.state = "free";
                            }
                            else if (currentCar.state === "riding4theride") {
                                currentCar.state = "waiting";
                            }
                        }
                    }
                }
            }
        }
    };
    return Simulation;
}());
exports.__esModule = true;
exports["default"] = Simulation;
//# sourceMappingURL=Simulation.js.map
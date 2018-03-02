"use strict";
var Ride_1 = require("./Ride");
var fs = require('fs');
var Simulation = (function () {
    function Simulation(fileName) {
        this.rides = []; // the list of rides for the simulation
        this.data = fs.readFileSync("./input/" + fileName + ".in", "utf-8");
        this.data = this.data.split('\n');
        var metaSimulation = this.data[0].split(' ');
        this.rows = parseInt(metaSimulation[0]);
        this.columns = parseInt(metaSimulation[1]);
        this.totalVehicles = parseInt(metaSimulation[2]);
        this.totalRides = parseInt(metaSimulation[3]);
        this.bonus = parseInt(metaSimulation[4]);
        this.steps = parseInt(metaSimulation[5]);
    }
    Simulation.prototype.generateRides = function () {
        var tmp;
        for (var i = 1, l = this.data.length; i < l; i++) {
            tmp = this.data[i].split(' ');
            if (tmp.length === 6) {
                this.rides.push(new Ride_1["default"](i - 1, tmp));
            }
        }
    };
    return Simulation;
}());
exports.__esModule = true;
exports["default"] = Simulation;
//# sourceMappingURL=Simulation.js.map
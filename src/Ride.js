"use strict";
exports.__esModule = true;
var Ride = /** @class */ (function () {
    function Ride(id, inputInstructions) {
        this.isSet = false;
        this.isFinished = false;
        this.id = id;
        this.startRow = parseInt(inputInstructions[0]);
        this.startColumn = parseInt(inputInstructions[1]);
        this.endRow = parseInt(inputInstructions[2]);
        this.endColumn = parseInt(inputInstructions[3]);
        this.earliestStart = parseInt(inputInstructions[4]);
        this.latestFinish = parseInt(inputInstructions[5]);
    }
    return Ride;
}());
exports["default"] = Ride;

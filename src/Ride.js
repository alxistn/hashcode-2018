"use strict";
var Ride = (function () {
    function Ride(id, inputInstructions) {
        this.readonly = id;
        this.readonly = startRow;
        this.readonly = startColumn;
        this.readonly = endRow;
        this.readonly = endColumn;
        this.readonly = earliestStart;
        this.readonly = latestFinish;
        this.isSet = false;
        this.isFinished = false;
        console.log(inputInstructions);
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
exports.__esModule = true;
exports["default"] = Ride;
//# sourceMappingURL=Ride.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ride = /** @class */ (function () {
    function Ride(id, startRow, startColumn, endRow, endColumn, earliestStart, latestFinish) {
        this.isSet = false;
        this.isFinished = false;
        this.id = id;
        this.startRow = parseInt(startRow);
        this.startColumn = parseInt(startColumn);
        this.endRow = parseInt(endRow);
        this.endColumn = parseInt(endColumn);
        this.earliestStart = parseInt(earliestStart);
        this.latestFinish = parseInt(latestFinish);
    }
    return Ride;
}());
exports.default = Ride;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(require("./Point"));
var Ride = /** @class */ (function () {
    function Ride(id, startRow, startColumn, endRow, endColumn, earliestStart, latestFinish) {
        this.isSet = false;
        this.isFinished = false;
        this.id = id;
        this.startPosition = new Point_1.default(parseInt(startColumn, 10), parseInt(startRow, 10));
        this.endPosition = new Point_1.default(parseInt(endColumn, 10), parseInt(endRow, 10));
        this.earliestStart = parseInt(earliestStart, 10);
        this.latestFinish = parseInt(latestFinish, 10);
    }
    return Ride;
}());
exports.default = Ride;

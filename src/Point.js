"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (point) {
        return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
    };
    Point.prototype.isEqual = function (point) {
        return this.x === point.x && this.y === point.y;
    };
    return Point;
}());
exports.default = Point;

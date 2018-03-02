"use strict";
exports.__esModule = true;
var CarState;
(function (CarState) {
    CarState[CarState["FREE"] = 0] = "FREE";
    CarState[CarState["GOING_TO_DEPARTURE"] = 1] = "GOING_TO_DEPARTURE";
    CarState[CarState["WAITING"] = 2] = "WAITING";
    CarState[CarState["GOING_TO_ARRIVAL"] = 3] = "GOING_TO_ARRIVAL";
})(CarState || (CarState = {}));
exports["default"] = CarState;

import CarState from "./CarState";
import Ride from "./Ride";

export default class Car {
    constructor(id: number) {
        this.id = id;
    }

    readonly id: number;

    private _state: CarState = CarState.FREE;
    private _row: number = 0;
    private _column: number = 0;
    private _rides: Ride[] = [];
    private _currentRide: Ride;
    distance: number = 0;

    get state() {
        return this._state;
    }

    get row() {
        return this._row;
    }

    get column() {
        return this._column;
    }

    get currentRide() {
        return this._currentRide;
    }

    setRide(ride: Ride) {
        this._rides.push(ride);
        this._currentRide = ride;
        if (this.row === ride.startRow && this.column === ride.startColumn) {
            this._state = CarState.WAITING;
        } else {
            this._state = CarState.GOING_TO_DEPARTURE;
        }
    }

    nextStep(currentStep: number) {
        if (this._state !== CarState.FREE && this.currentRide !== null) {
            let destinationRow;
            let destinationColumn;
            let currentRide = this.currentRide;

            // CAR IS WAITING, CHECK IF IT CAN RIDE
            if (this._state === CarState.WAITING && currentStep >= currentRide.earliestStart) {
                this._state = CarState.GOING_TO_DEPARTURE;
            }

            if (this._state !== CarState.WAITING) {
                // FIND DESTINATION
                if (this._state === CarState.GOING_TO_ARRIVAL) {
                    destinationRow = currentRide.endRow;
                    destinationColumn = currentRide.endColumn;
                } else {
                    destinationRow = currentRide.startRow;
                    destinationColumn = currentRide.startColumn;
                }

                if (destinationRow !== this.row) {
                    if (destinationRow - this.row < 0) {
                        this._row--;
                    } else {
                        this._row++;
                    }
                } else if (destinationColumn !== this.column) {
                    if (destinationColumn - this.column < 0) {
                        this._column--;
                    } else {
                        this._column++;
                    }
                }

                if (destinationColumn === this.column && destinationRow === this.row) {
                    if (this._state === CarState.GOING_TO_ARRIVAL) {
                        currentRide.isFinished = true;
                        this._state = CarState.FREE;
                    } else if (this._state === CarState.GOING_TO_DEPARTURE) {
                        this._state = CarState.WAITING;
                    }
                }
            }
        }
    }

    summarize() {
        let ridesOrder = "";
        this._rides.filter(x => x.isFinished).map(x => {
            ridesOrder += (x.id + " ");
        });
        return this._rides.length + " " + ridesOrder;
    }
}
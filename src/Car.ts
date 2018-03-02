import CarState from "./CarState";
import Point from "./Point";
import Ride from "./Ride";

export default class Car {
    public readonly id: number;
    public distance: number = 0;

    private _state: CarState = CarState.FREE;
    private _position: Point;
    private _rides: Ride[] = [];
    private _currentRide: Ride;

    get state() {
        return this._state;
    }

    get position() {
        return this._position;
    }

    get currentRide() {
        return this._currentRide;
    }

    constructor(id: number) {
        this.id = id;
        this._position = new Point();
    }

    public setRide(ride: Ride) {
        this._rides.push(ride);
        this._currentRide = ride;
        if (this._position.isEqual(ride.startPosition)) {
            this._state = CarState.WAITING;
        } else {
            this._state = CarState.GOING_TO_DEPARTURE;
        }
    }

    public nextStep(currentStep: number) {
        if (this._state !== CarState.FREE && this.currentRide !== null) {
            let destinationPoint;

            // CAR IS WAITING, CHECK IF IT CAN RIDE
            if (this._state === CarState.WAITING && currentStep >= this.currentRide.earliestStart) {
                this._state = CarState.GOING_TO_DEPARTURE;
            }

            if (this._state !== CarState.WAITING) {
                // FIND DESTINATION
                if (this._state === CarState.GOING_TO_ARRIVAL) {
                    destinationPoint = this.currentRide.endPosition;
                } else {
                    destinationPoint = this.currentRide.startPosition;
                }

                if (destinationPoint.y !== this._position.y) {
                    if (destinationPoint.y - this._position.y < 0) {
                        this._position.y--;
                    } else {
                        this._position.y++;
                    }
                } else if (destinationPoint.x !== this._position.x) {
                    if (destinationPoint.x - this._position.x < 0) {
                        this._position.x--;
                    } else {
                        this._position.x++;
                    }
                }

                if (this._position.isEqual(destinationPoint)) {
                    if (this._state === CarState.GOING_TO_ARRIVAL) {
                        this.currentRide.isFinished = true;
                        this._state = CarState.FREE;
                    } else if (this._state === CarState.GOING_TO_DEPARTURE) {
                        this._state = CarState.WAITING;
                    }
                }
            }
        }
    }

    public summarize() {
        let ridesOrder = "";
        this._rides.filter((x) => x.isFinished).map((x) => {
            ridesOrder += (x.id + " ");
        });
        return this._rides.length + " " + ridesOrder;
    }
}

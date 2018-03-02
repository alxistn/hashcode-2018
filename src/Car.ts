import CarState from "./CarState";
import Ride from "./Ride";

export default class Car {
    constructor(id: number) {
        this.id = id;
    }

    setRide(ride: Ride) {
        this.rides.push(ride);
        this.currentRide = ride;
        if (this.row === ride.startRow && this.column === ride.startColumn) {
            this.state = CarState.WAITING;
        } else {
            this.state = CarState.GOING_TO_DEPARTURE;
        }
    }

    summarize() {
        let ridesOrder = "";
        this.rides.filter(x => x.isFinished).map(x => {
            ridesOrder += (x.id + " ");
        });
        return this.rides.length + " " + ridesOrder;
    }

    readonly id: number;
    state: CarState = CarState.FREE;
    row: number = 0;
    column: number = 0;
    rides: Ride[] = [];
    currentRide: Ride;
    distance: number = 0;
}
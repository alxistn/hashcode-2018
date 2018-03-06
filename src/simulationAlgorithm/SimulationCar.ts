import AbstractCar from "../AbstractCar";
import CarState from "../CarState";
import Ride from "../Ride";

export default class SimulationCar extends AbstractCar {
    private _state: CarState = CarState.FREE;
    private _currentRide: Ride | null = null;

    public nextStep(currentStep: number, availableRides: Ride[]) {
        this._currentStep = currentStep;

        if (this._state === CarState.FREE) {
            this.findBestRide(availableRides);
        }

        if (this._state !== CarState.FREE && this._currentRide !== null) {
            let destinationPoint;

            // CAR IS WAITING, CHECK IF IT CAN RIDE
            if (this._state === CarState.WAITING && this._currentStep >= this._currentRide.earliestStart) {
                this._state = CarState.GOING_TO_ARRIVAL;
            }

            if (this._state !== CarState.WAITING) {
                // FIND DESTINATION
                if (this._state === CarState.GOING_TO_ARRIVAL) {
                    destinationPoint = this._currentRide.endPosition;
                } else {
                    destinationPoint = this._currentRide.startPosition;
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
                        this._state = CarState.FREE;
                    } else if (this._state === CarState.GOING_TO_DEPARTURE) {
                        this._state = CarState.WAITING;
                    }
                }
            }
        }
    }

    protected handleImpossibleRide(availableRides: Ride[], index: number, bestRideIndex: number): number {
        availableRides.splice(index, 1);
        bestRideIndex--;
        return bestRideIndex;
    }

    protected setRide(availableRides: Ride[], ride: Ride) {
        availableRides.splice(availableRides.indexOf(ride), 1);

        this._totalScore.addRide(ride, this);

        this._rides.push(ride);
        this._currentRide = ride;
        if (this._position.isEqual(ride.startPosition)) {
            this._state = CarState.WAITING;
        } else {
            this._state = CarState.GOING_TO_DEPARTURE;
        }
    }
}

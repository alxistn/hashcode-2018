import AbstractCar from "../AbstractCar";
import Ride from "../Ride";

export default class PredictionCar extends AbstractCar {
    public predictRides(availableRides: Ride[]) {
        let running: boolean = true;

        while (running) {
            if (!this.findBestRide(availableRides)) {
                running = false;
            }
        }

        this.summarize();
    }

    protected handleImpossibleRide(availableRides: Ride[], index: number, bestRideIndex: number): number {
        return bestRideIndex;
    }

    protected setRide(availableRides: Ride[], ride: Ride) {
        availableRides.splice(availableRides.indexOf(ride), 1);

        this._totalScore.addRide(ride, this);

        this._rides.push(ride);
        this.updateCurrentStep(ride);
    }

    private updateCurrentStep(ride: Ride) {
        const carDistance: number = this._position.distance(ride.startPosition);
        const rideDistance: number = ride.startPosition.distance(ride.endPosition);
        const stepsUntilRideBegin: number = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        this._currentStep += (carDistance + rideDistance + stepsUntilRideBegin) - 1;
    }
}
import Point from "./Point";
import Ride from "./Ride";
import TotalScore from "./TotalScore";

export default abstract class AbstractCar {
    public readonly id: number;

    protected _rideBonus: number;
    protected _currentStep: number = 0;

    protected _position: Point;
    protected _rides: Ride[] = [];
    protected _totalScore: TotalScore;


    constructor(id: number, rideBonus: number) {
        this.id = id;
        this._rideBonus = rideBonus;
        this._position = new Point();
        this._totalScore = TotalScore.Instance;
    }

    public get position() {
        return this._position;
    }

    public get currentStep() {
        return this._currentStep;
    }

    public get rideBonus() {
        return this._rideBonus;
    }

    public summarize() {
        let ridesOrder = "";

        this._rides.map((ride) => {
            ridesOrder += (ride.id + " ");
        });

        return this._rides.length + " " + ridesOrder;
    }

    protected abstract handleImpossibleRide(availableRides: Ride[], index: number, bestRideIndex: number): number;
    protected abstract setRide(availableRides: Ride[], ride: Ride): void;

    protected findBestRide(availableRides: Ride[]): boolean {
        let bestRide: Ride = availableRides[0];
        let bestRatio: number = 0;
        let bestRideIndex: number = -1;

        for (let i = availableRides.length - 1 ; i >= 0 ; --i) {
            const ride = availableRides[i];

            if (this._currentStep >= ride.latestFinish) {
                bestRideIndex = this.handleImpossibleRide(availableRides, i, bestRideIndex);
                continue;
            }

            const ratio = this.calculatePointsPerStep(ride);
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestRide = ride;
                bestRideIndex = i;
            }
        }

        if (bestRideIndex >= 0) {
            this.setRide(availableRides, bestRide);
            return true;
        }
        return false;
    }

    protected calculatePointsPerStep(ride: Ride): number {
        const carDistance: number = this._position.distance(ride.startPosition);
        const rideDistance: number = ride.startPosition.distance(ride.endPosition);
        const stepsUntilRideBegin: number = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        const totalSteps: number = rideDistance +
            (carDistance  > stepsUntilRideBegin ? carDistance  : stepsUntilRideBegin);
        let totalPoints: number = rideDistance;

        if (this._currentStep + totalSteps >= ride.latestFinish) {
            return 0;
        }

        if (this._currentStep + carDistance <= ride.earliestStart) {
            totalPoints += this._rideBonus;
        }

        return totalPoints / totalSteps;
    }
}

import Point from "./Point";
import Ride from "./Ride";
import TotalScore from "./TotalScore";

export default class Car {
    public readonly id: number;

    private _rideBonus: number;
    private _currentStep: number = 0;

    private _position: Point;
    private _rideIds: number[] = [];
    private _totalScore: TotalScore;

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

    public summarize(availableRides: Ride[]) {
        let ridesOrder = "";

        this.findBestRides(availableRides);

        this._rideIds.map((rideId) => {
            ridesOrder += (rideId + " ");
        });

        return this._rideIds.length + " " + ridesOrder;
    }

    private findBestRides(availableRides: Ride[]) {
        let running: boolean = true;

        while (running) {
            if (!this.findBestRide(availableRides)) {
                running = false;
            }
        }
    }

    private findBestRide(availableRides: Ride[]): boolean {
        let bestRide: Ride = availableRides[0];
        let bestRatio: number = 0;
        let bestRideIndex: number = -1;

        for (let i = availableRides.length - 1 ; i >= 0 ; --i) {
            const ride = availableRides[i];

            const ratio = this.calculatePointsPerStep(ride);
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestRide = ride;
                bestRideIndex = i;
            }
        }

        if (bestRideIndex >= 0) {
            availableRides.splice(availableRides.indexOf(bestRide), 1);
            this.setRide(bestRide);
            this.updateCurrentStep(bestRide);
            return true;
        }
        return false;
    }

    private updateCurrentStep(ride: Ride) {
        const carDistance: number = this._position.distance(ride.startPosition);
        const rideDistance: number = ride.startPosition.distance(ride.endPosition);
        const stepsUntilRideBegin: number = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        this._currentStep += (carDistance + rideDistance + stepsUntilRideBegin) - 1;
    }

    private setRide(ride: Ride) {
        this._totalScore.addRide(ride, this);
        this._rideIds.push(ride.id);
    }

    private calculatePointsPerStep(ride: Ride): number {
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

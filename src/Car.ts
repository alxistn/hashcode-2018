import CarState from "./CarState";
import Point from "./Point";
import Ride from "./Ride";
import TotalScore from "./TotalScore";

export default class Car {
    public readonly id: number;

    private _rideBonus: number;
    private _currentStep: number = 0;

    private _state: CarState = CarState.FREE;
    private _position: Point;
    private _rides: Ride[] = [];
    private _currentRide: Ride | null = null;
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

    public summarize() {
        let ridesOrder = "";

        this._rides.map((ride) => {
            ridesOrder += (ride.id + " ");
        });

        return this._rides.length + " " + ridesOrder;
    }

    private findBestRide(availableRides: Ride[]) {
        let bestRide: Ride = availableRides[0];
        let bestNumberOfPoints: number = 0;
        let bestRideIndex: number = -1;

        for (let i = availableRides.length - 1 ; i >= 0 ; --i) {
            const ride = availableRides[i];

            if (this._currentStep >= ride.latestFinish) {
                availableRides.splice(i, 1);
                bestRideIndex--;
                continue;
            }

            const numberOfPoints = this.calculatePointsPerStep(ride);
            if (numberOfPoints > bestNumberOfPoints) {
                bestNumberOfPoints = numberOfPoints;
                bestRide = ride;
                bestRideIndex = i;
            }
        }

        if (bestRideIndex >= 0) {
            availableRides.splice(availableRides.indexOf(bestRide), 1);
            this.setRide(bestRide);
        }
    }

    private setRide(ride: Ride) {
        this._totalScore.addRide(ride, this);

        this._rides.push(ride);
        this._currentRide = ride;
        if (this._position.isEqual(ride.startPosition)) {
            this._state = CarState.WAITING;
        } else {
            this._state = CarState.GOING_TO_DEPARTURE;
        }
    }

    private calculatePointsPerStep(ride: Ride): number {
        const carDistance: number = this._position.distance(ride.startPosition);
        const rideDistance: number = ride.startPosition.distance(ride.endPosition);
        const stepsUntilRideBegin: number = (ride.earliestStart - this._currentStep > 0) ?
            ride.earliestStart - this._currentStep :
            0;
        const totalSteps: number = carDistance + rideDistance + stepsUntilRideBegin;
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

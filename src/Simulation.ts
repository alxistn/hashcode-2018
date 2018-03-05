import * as fs from "fs";

import Car from "./Car";
import Ride from "./Ride";

import CarState from "./CarState";

export default class Simulation {
    private fileName: string;

    private rows: number;
    private columns: number;
    private totalVehicles: number;
    private totalRides: number;
    private bonus: number;
    private maximumSteps: number;

    private currentStep: number = 0;
    private availableRides: Ride[] = [];
    private cars: Car[] = [];
    private data: string[];

    constructor(fileName: string) {
        this.fileName = fileName;

        const fileContent = fs.readFileSync(`./input/${this.fileName}.in`, "utf-8");
        this.data = fileContent.split("\n");

        const metaSimulation = this.data[0].split(" ");

        this.rows = parseInt(metaSimulation[0], 10);
        this.columns = parseInt(metaSimulation[1], 10);
        this.totalVehicles = parseInt(metaSimulation[2], 10);
        this.totalRides = parseInt(metaSimulation[3], 10);
        this.bonus = parseInt(metaSimulation[4], 10);
        this.maximumSteps = parseInt(metaSimulation[5], 10);

        for (let i = 0; i < this.totalVehicles; i++) {
            this.cars.push(new Car(i));
        }
    }

    public generateRides() {
        for (let i = 1, l = this.data.length; i < l; ++i) {
            const rideDescription = this.data[i].split(" ");

            if (rideDescription.length === 6) {
                this.availableRides.push(new Ride(i - 1, ...rideDescription));
            }
        }
    }

    public setRides() {
        const filteredCars: Car[] = this.cars.filter((c) => c.state === CarState.FREE);
        if (!filteredCars.length) {
            return;
        }

        for (let i = this.availableRides.length - 1; i >= 0; --i) {
            const ride = this.availableRides[i];
            let bestCar: Car | null = null;
            let bestCarIndex: number = 0;

            for (let j = 0, l = filteredCars.length ; j < l ; ++j) {
                const filteredCar = filteredCars[j];
                filteredCar.distance = filteredCar.position.distance(ride.startPosition);
                if (bestCar === null || filteredCar.distance < bestCar.distance) {
                    bestCar = filteredCar;
                    bestCarIndex = j;
                }
            }

            if (bestCar) {
                bestCar.setRide(ride);
                this.availableRides.splice(i, 1);
                filteredCars.splice(bestCarIndex, 1);
            } else {
                break;
            }

            if (!filteredCars.length) {
                break;
            }
        }
    }

    public output() {
        let file = "";
        for (const car of this.cars) {
            file += car.summarize() + "\n";
        }

        fs.writeFileSync(`output/${this.fileName}.ou`, file);
    }

    public start() {
        while (this.currentStep < this.maximumSteps) {
            this.setRides();
            for (const car of this.cars) {
                car.nextStep(this.currentStep);
            }
            this.currentStep++;
        }
    }
}

import * as fs from "fs";

import Car from "./Car";
import Ride from "./Ride";

import CarState from "./CarState";

export default class Simulation {
    private fileName: string;
    private rows: number; // number of rows of the grid
    private columns: number; // number of columns of the grid
    private totalVehicles: number; // number of vehicles in the fleet
    private totalRides: number; // number of rides
    private bonus: number; // per-ride bonus
    private steps: number; // number of steps in the simulation
    private rides: Ride[] = []; // the list of rides for the simulation
    private cars: Car[] = [];
    private data: string[];  // the data input formatted

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
        this.steps = parseInt(metaSimulation[5], 10);

        for (let i = 0; i < this.totalVehicles; i++) {
            this.cars.push(new Car(i));
        }
    }

    public generateRides() {
        let tmp;

        for (let i = 1, l = this.data.length; i < l; i++) {
            tmp = this.data[i].split(" ");

            if (tmp.length === 6) {
                this.rides.push(new Ride(i - 1, ...tmp));
            }
        }
    }

    public setRides(step: number) {
        for (let i = this.rides.length - 1; i >= 0; i--) {
            if (this.rides[i].latestFinish < step) {
                break;
            }

            const filteredCars = this.cars.filter((c) => c.state === CarState.FREE);
            let bestCar: Car | null = null;
            for (const filteredCar of filteredCars) {
                filteredCar.distance = filteredCar.position.distance(this.rides[i].startPosition);
                if (bestCar === null || filteredCar.distance < bestCar.distance) {
                    bestCar = filteredCar;
                }
            }
            if (bestCar) {
                bestCar.setRide(this.rides[i]);
                this.rides.splice(i, 1);
            } else {
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
        for (let step = 0; step < this.steps; ++step) {
            this.setRides(step);
            for (const car of this.cars) {
                car.nextStep(step);
            }
        }
    }
}

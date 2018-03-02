import Simulation from './Simulation';
import fileNames from './fileNames.json';

for (let i = 0 ; i < fileNames.length ; ++i) {
    var simulation = new Simulation(fileNames[i]);
    console.log(simulation);


    // let cars = [];
    // for (let i = 0; i < totalVehicles; i++) {
    //     cars.push(new Car(i));
    // }

    
    // output();
}
var Car = /** @class */ (function () {
    // riding / waiting / riding4theride /
    function Car(id) {
        this.id = id;
        this.state = 'free';
        this.row = 0;
        this.column = 0;
        this.rides = [];
        this.currentRide = null;
    }
    Car.prototype.setRide = function (ride) {
        this.rides.push(ride);
        this.currentRide = ride;
        if (this.row === ride.startRow && this.column === ride.startColumn) {
            this.state = 'waiting';
        }
        else {
            this.state = 'riding4theride';
        }
    };
    Car.prototype.summarize = function () {
        var ridesOrder = "";
        this.rides.filter(function (x) { return x.isFinished; }).map(function (x) {
            ridesOrder += (x.id + " ");
        });
        return this.rides.length + " " + ridesOrder;
    };
    return Car;
}());

class Car {
    // riding / waiting / riding4theride /

    constructor(id) {
        this.id = id;
        this.state = 'free';
        this.row = 0;
        this.column = 0;
        this.rides = [];
        this.currentRide = null;
    }

    setRide(ride) {
        this.rides.push(ride);
        this.currentRide = ride;
        if (this.row === ride.startRow && this.column === ride.startColumn) {
            this.state = 'waiting';
        } else {
            this.state = 'riding4theride';
        }
    }

    summarize() {
        let ridesOrder = "";
        this.rides.filter(x => x.isFinished).map(x => {
            ridesOrder += (x.id + " ");
        });
        return this.rides.length + " " + ridesOrder;
    }
}
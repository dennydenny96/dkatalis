const fs = require('fs')
const fileInput = 'file_input.txt'

class ParkingLot {
    constructor() {
        this.capacity = 0;
        this.allocated = [];
        this.outPark = [];
    }

    async createParkingLot(capacity) {
        if (capacity.length != 1 || isNaN(capacity) || capacity < 1) {
            return `Invalid parameters please input the Capacity`;
        }
        this.capacity = capacity[0];
        this.outPark = [];
        this.allocated = [];
        let slot = 1;
        while (slot <= this.capacity) {
            this.outPark.push(slot);
            slot++;
        }
        return `Created parking lot with ${this.capacity} slots`;
    }

    async park(car) {
        if (car.length != 1) {
            return `Invalid parameters please input Registration Number`;
        }
        if (this.capacity < 1) {
            return `Please type "create_parking_lot {number}" to create parking lot capacity!`;
        }
        if (this.capacity == this.allocated.length) {
            return `Sorry, parking lot is full`;
        }
        const slot = this.outPark[0];
        this.allocated.splice(slot - 1, 0, {
            slot: slot,
            registrationNumber: car[0],
        });

        this.outPark.shift();
        return `Allocated slot number: ${slot}`;
    }

    async leave(car) {
        if (car.length != 2 || isNaN(car[1])) {
            return `Invalid parameters please input the Registered Number and total hour`;
        }
        if (this.capacity < 1) {
            return `Parking lot capacity still unknown! please type "create_parking_lot {number}" to create parking lot capacity!`;
        }
        const [slotAvailable, slotNumber] = await this.findCar(car[0]);
        if (slotNumber == 0) {
            return `Registration number ${car[0]} not found`;
        }
        this.allocated.splice(slotAvailable, 1);
        this.outPark.push(slotNumber);
        this.outPark.sort();
        const charge = await this.charge(car[1]);
        return `Registration number ${car[0]} with Slot Number ${slotNumber} is free with Charge ${charge}`;
    }

    async charge(hours) {
        return hours <= 2 ? 10 : (hours - 2) * 10 + 10;
    }

    async findCar(registrationNumber) {
        let slotAvailable = 0;
        let slotNumber = 0;
        this.allocated.map(async (e, slot) => {
            if (registrationNumber == e.registrationNumber) {
                slotAvailable = slot;
                slotNumber = e.slot;
            }
        });
        return [slotAvailable, slotNumber];
    }

    async status() {
        if (this.capacity < 1) {
            return `There is no parking capacity`;
        }
        let status = this.allocated.length < 1 ?
            `Nobody is parking here, still Available ${this.capacity} slots`
            : `Slot No.\tRegistration No.\t\n`;

        this.allocated.map(async (e) => {
            status =
                status + `${e.slot}\t${e.registrationNumber}\t\n`;
        });
        return status;
    }
}

module.exports = ParkingLot;

const chai = require("chai");
const ParkingLot = require("./parkingLot");
const parkingLot = new ParkingLot();

describe(`create_parking_lot 6`, async () => {
    it(`creating parking lot with 6 slots`, async () => {
        const res = await parkingLot.createParkingLot([6]);
        chai.expect(res).to.be.equal(`Created parking lot with 6 slots`);
    });
});

describe(`park KA-01-HH-1234`, async () => {
    it(`slot number 1`, async () => {
        const res = await parkingLot.park(['KA-01-HH-1234']);
        chai.expect(res).to.be.equal(`Allocated slot number: 1`);
    });
});

describe(`park KA-01-HH-9999`, async () => {
    it(`slot number 2`, async () => {
        const res = await parkingLot.park(['KA-01-HH-9999']);
        chai.expect(res).to.be.equal(`Allocated slot number: 2`);
    });
});

describe(`park KA-01-BB-0001`, async () => {
    it(`slot number 3`, async () => {
        const res = await parkingLot.park(['KA-01-BB-0001']);
        chai.expect(res).to.be.equal(`Allocated slot number: 3`);
    });
});

describe(`park KA-01-HH-7777`, async () => {
    it(`slot number 4`, async () => {
        const res = await parkingLot.park(['KA-01-HH-7777']);
        chai.expect(res).to.be.equal(`Allocated slot number: 4`);
    });
});

describe(`park KA-01-HH-2701`, async () => {
    it(`slot number 5`, async () => {
        const res = await parkingLot.park(['KA-01-HH-2701']);
        chai.expect(res).to.be.equal(`Allocated slot number: 5`);
    });
});

describe(`park KA-01-HH-3141`, async () => {
    it(`slot number 6`, async () => {
        const res = await parkingLot.park(['KA-01-HH-3141']);
        chai.expect(res).to.be.equal(`Allocated slot number: 6`);
    });
});

describe(`leave KA-01-HH-3141 4`, async () => {
    it(`leave car registration number KA-01-HH-3141 for 4 hours parking with charge 30`, async () => {
        const res = await parkingLot.leave(['KA-01-HH-3141', '4']);
        chai.expect(res).to.be.equal(`Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30`);
    });
});

describe(`status`, async () => {
    it(`status in parking lot`, async () => {
        const res = await parkingLot.status();
        chai.expect(res).to.be.equal(`Slot No.\tRegistration No.\t\n1\tKA-01-HH-1234\t\n2\tKA-01-HH-9999\t\n3\tKA-01-BB-0001\t\n4\tKA-01-HH-7777\t\n5\tKA-01-HH-2701\t\n`);
    });
});

describe(`park KA-01-P-333`, async () => {
    it(`slot number 6`, async () => {
        const res = await parkingLot.park(['KA-01-P-333']);
        chai.expect(res).to.be.equal(`Allocated slot number: 6`);
    });
});

describe(`park DL-12-AA-9999`, async () => {
    it(`failed to park, parking lot is full`, async () => {
        const res = await parkingLot.park(['DL-12-AA-9999']);
        chai.expect(res).to.be.equal(`Sorry, parking lot is full`);
    });
});

describe(`leave KA-01-HH-1234 4`, async () => {
    it(`leave registration number KA-01-HH-1234 for 4 hours parking with charge 30`, async () => {
        const res = await parkingLot.leave(['KA-01-HH-1234', '4']);
        chai.expect(res).to.be.equal(`Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30`);
    });
});

describe(`leave KA-01-BB-0001 6`, async () => {
    it(`leave car registration number KA-01-BB-0001 for 6 hours parking with charge 50`, async () => {
        const res = await parkingLot.leave(['KA-01-BB-0001', '6']);
        chai.expect(res).to.be.equal(`Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50`);
    });
});

describe(`leave DL-12-AA-9999 2`, async () => {
    it(`registration number DL-12-AA-9999 is not found`, async () => {
        const res = await parkingLot.leave(['DL-12-AA-9999', '2']);
        chai.expect(res).to.be.equal(`Registration number DL-12-AA-9999 not found`);
    });
});

describe(`park KA-09-HH-0987`, async () => {
    it(`slot number 1`, async () => {
        const res = await parkingLot.park(['KA-09-HH-0987']);
        chai.expect(res).to.be.equal(`Allocated slot number: 1`);
    });
});

describe(`park CA-09-IO-1111`, async () => {
    it(`slot number 3`, async () => {
        const res = await parkingLot.park(['CA-09-IO-1111']);
        chai.expect(res).to.be.equal(`Allocated slot number: 3`);
    });
});

describe(`park KA-09-HH-0123`, async () => {
    it(`failed to park, parking lot is full`, async () => {
        const res = await parkingLot.park(['KA-09-HH-0123']);
        chai.expect(res).to.be.equal(`Sorry, parking lot is full`);
    });
});

describe(`status`, async () => {
    it(`status in parking lot`, async () => {
        const res = await parkingLot.status();
        chai.expect(res).to.be.equal(`Slot No.\tRegistration No.\t\n1\tKA-09-HH-0987\t\n2\tKA-01-HH-9999\t\n3\tCA-09-IO-1111\t\n4\tKA-01-HH-7777\t\n5\tKA-01-HH-2701\t\n6\tKA-01-P-333\t\n`);
    });
});
const commandReader = require("readline");
const ParkingLot = require("./test/parkingLot");
const router = require("./router");

const main = async () => {
    const cmd = commandReader.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.log(`
        1. Create parking lot of size n : create_parking_lot {capacity}
        2. Park a car : park {car_number}
        3. Remove(Unpark) car from : leave {car_number} {hours}
        4. Print status of parking slot : status`
    );
    const parkingLot = new ParkingLot();
    cmd.on("line", async (input) => {
        const inputList = input.split(" ");
        const value = inputList.splice(1, inputList.length);
        const command = router[inputList[0]];
        if (!command) {
            console.log(
                `Command is not found!`
            );
        } else {
            try {
                const res = (value.length == 0 ? await parkingLot[command]() : await parkingLot[command](value)) || "";
                console.log(res)
            } catch (err) {
                console.log(err);
            }
        }
    });
};

main();

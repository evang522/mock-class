const assert = require('assert');

import ClassMocker from "./src/ClassMocker";

class Main {
    public static run(): void {
        process.stdin.resume();

        const car = ClassMocker.mockClass<Car>(Car);

        car.mock().method('start').willReturn('the mocked return value');
        const result = test(car);
        test(car);

        assert.equal(result, 'the mocked return value');
        assert.equal(car.mock().method('start').wasCalledTimes(2), true);
        assert.equal(car.mock().method('start').wasCalledWith(undefined), true);
        assert.equal(car.mock().method('fuelUp').wasCalledWith(1000), true);
        assert.equal(car.mock().method('fuelUp').wasCalledWith(500, 1), true);
        assert.equal(car.mock().method('fuelUp').wasCalledWith(1000, 2), true);
        assert.equal(car.mock().method('fuelUp').wasCalledWith(500, 3), true);
        assert.equal(car.mock().method('fuelUp').amountOfCalls(), 4);
    }
}


class Car {
    public start() {
        return 'start';
    }

    public what() {
        return 'what';
    }

    public fuelUp(fuelQuantity: number): string {
        return 'good for the next ' + fuelQuantity / 5 + ' hours';
    }
}

function test(car: Car) {
    car.fuelUp(1000);
    car.fuelUp(500);
    return car.start();
}



Main.run();

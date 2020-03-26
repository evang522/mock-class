# mock-class
Mock any ES6 class, record calls of object methods, and mock return values and behavior.

```js
 class Car {
     public go() {
        console.log('going');
     }
     
     public stop() {
        console.log('stopped');
     }
 
 }


 const carMock = ClassMocker.mockClass<Car>(Car);
 
 carMock.mock().method('stop').willReturn('test mocked return value');
 
 const result = carMock.stop();
 
 carMock.amountOfCalls() // 1
 expect(result).toBe('test mocked return value');

```

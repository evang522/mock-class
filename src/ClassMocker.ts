import MockRecord from './MockRecord';
import ExpectationSyntax from './ExpectationSyntax';

export default class ClassMocker {

    public static mockClass<TClass extends object>(classToMock: Function): TClass & { mock: () => ExpectationSyntax }
    {
        const self = new this();
        return self.mockClass(classToMock);
    }

    public mockClass<TClass extends object>(classToMock: Function): TClass & { mock: () => ExpectationSyntax } {
        const callMap = this.createCallMap();

        return new Proxy<TClass & { mock: () => ExpectationSyntax }>(Object.create({}), this.createProxyTrapHandler(callMap, classToMock))
    }

    private getCallRecordingFunction(
        callMap: Map<string, MockRecord | undefined>,
        classToMock: Function
    ): (target: any, propertyName: string) => void {

        return function (target, propertyName): () => void | undefined | ExpectationSyntax {

            const classPrototypeMethodList = Reflect.ownKeys(classToMock.prototype);

            if (propertyName === 'mock') {
                return () => new ExpectationSyntax(callMap, classPrototypeMethodList);
            }

            if (!classPrototypeMethodList.includes(propertyName)) {
                return undefined;
            }

            return function (): any {
                if (!callMap.get(propertyName)) {
                    callMap.set(propertyName, new MockRecord());
                }

                const mockRecord = callMap.get(propertyName)!;

                const argumentList = Array.from(arguments);
                mockRecord.recordCall(argumentList);

                if (mockRecord.getReturnValue())
                {
                    return mockRecord.getReturnValue();
                }
            }
        }
    }

    private createProxyTrapHandler(callMap: Map<string, MockRecord | undefined>, classToMock: Function): object {
        return {
            get: this.getCallRecordingFunction(callMap, classToMock),
        }
    }

    private createCallMap(): Map<string, MockRecord | undefined> {
        return new Map();
    }

    private methodOrPropertyExistsInClass = (propertyName: string, mockedClass: Function): boolean => {
        return Reflect.ownKeys(mockedClass.prototype).includes(propertyName);
    }
}

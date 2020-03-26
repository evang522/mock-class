import MockRecord from './MockRecord';

export default class MethodExpectationSyntax {
    public constructor(
        private callMap: Map<string, MockRecord | undefined>,
        private methodName: string,
    ) {
    }

    public amountOfCalls(): number {
        const map = this.callMap.get(this.methodName);

        if (!map) {
            return 0;
        }

        return map.getCalls().length;

    }

    public wasCalledTimes(times: number): boolean {
        return this.amountOfCalls() === times;
    }

    public wasCalledWith(expectedArguments: any[] | any, callIndex: number = 0) {
        const record = this.callMap.get(this.methodName);

        if (!record) {
            return !record && !expectedArguments;
        }

        let result = true;

        if (expectedArguments instanceof Array) {
            expectedArguments.forEach((argument, index) => {
                if (argument !== expectedArguments[index]) {
                    result = false;
                }
            })

            return result;
        } else {
            return expectedArguments === record.getCallAtIndex(callIndex)[0];
        }

    }

    public willReturn(returnValue: any) {
        if (!this.callMap.get(this.methodName)) {
            this.callMap.set(this.methodName, new MockRecord());
        }

        const record = this.callMap.get(this.methodName);

        record.setReturnValue(returnValue);
    }
}

export default class MockRecord {
    public constructor(
        private calls: Array<any[]> = [],
        private returnValue: any = null,
    ) { }

    public recordCall(callParameters: any[]) {
        this.calls.push(callParameters);
    }

    public setReturnValue(returnValue: any) {
        this.returnValue = returnValue;
    }

    public getReturnValue(): any {
        return this.returnValue;
    }

    public getCalls() {
        return this.calls;
    }

    public getCallAtIndex(index: number): any {
        return this.calls[index];
    }
}
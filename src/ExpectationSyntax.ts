import MethodExpectationSyntax from "./MethodExpectationSyntax";


export default class ExpectationSyntax {
    public constructor(
        private callMap: Map<string, MockRecord | undefined>,
        private methodList: Array<string | number | symbol>,
    ) { }

    public method(methodName: string): MethodExpectationSyntax {
        if (!this.methodList.includes(methodName)) {
            throw new Error(`Method ${methodName} does not exist in this object.`);
        }
        return new MethodExpectationSyntax(this.callMap, methodName);
    }
}

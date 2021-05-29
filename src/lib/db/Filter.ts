export enum Operator {
    EQ = "=",
    NOT_EQ = "<>",
    LESS_THAN = "<",
    GREATER_THAN = ">",
};

export const getOperator = (operator: string) => {
    switch(operator) {
        case "=" : return Operator.EQ
        case "<>": return Operator.NOT_EQ
        case "<" : return Operator.LESS_THAN
        case ">" : return Operator.GREATER_THAN
        default :  throw new Error("Invalid Operator")
    }
}

export class Filter {
    label: string;
    operator: Operator;
    value: string;

    toString() {
        return `${this.label} ${this.operator} ${this.value}`;
    };

    static makeFilter(label: string, operator: string, value: string): Filter {
        const keys = [
            "id",
            "name",
            "experience",
            "age",
            "position",
            "reportsTo",
          ];

        const regularExpression = new RegExp(/^[a-z0-9]+$/i);
        if(!keys.includes(label) || !regularExpression.test(value)) {
            throw new Error("Invalid label");
        }

        const op =  getOperator(operator);

        return {
            label,
            operator: op,
            value
        };
    };
}
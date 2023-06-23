type ComponentWiseOperation = (operandA: number, operandB: number) => number;
type VectorArgument<Array extends Tuple> = number | Array | GenericVector<Array>;

export type Tuple2 = [number, number];
export type Tuple3 = [number, number, number];
export type Tuple4 = [number, number, number, number];
export type Tuple = Tuple2 | Tuple3 | Tuple4;

export class GenericVector<Array extends Tuple> {

    public readonly components: Array;

    public constructor(...components: Array) {
        this.components = components;
    }

    public add(scalar: number): this;
    public add(vector: GenericVector<Array>): this;
    public add(array: Array): this;
    public add(value: VectorArgument<Array>) { return this.operation(value, (a, b) => a + b); }

    public subtract(scalar: number): this;
    public subtract(vector: GenericVector<Array>): this;
    public subtract(array: Array): this;
    public subtract(value: VectorArgument<Array>) { return this.operation(value, (a, b) => a - b); }

    public multiply(scalar: number): this;
    public multiply(vector: GenericVector<Array>): this;
    public multiply(array: Array): this;
    public multiply(value: VectorArgument<Array>) { return this.operation(value, (a, b) => a * b); }

    public divide(scalar: number): this;
    public divide(vector: GenericVector<Array>): this;
    public divide(array: Array): this;
    public divide(value: VectorArgument<Array>) { return this.operation(value, (a, b) => a / b); }

    public set(scalar: number): this;
    public set(vector: GenericVector<Array>): this;
    public set(array: Array): this;
    public set(value: VectorArgument<Array>) { return this.operation(value, (_, b) => b); }

    public dot(value: GenericVector<Array>) { return this.clone().multiply(value).getSum(); }

    public distance(vector: GenericVector<Array>) {
        const difference = this.clone().subtract(vector);
        return Math.sqrt(difference.multiply(difference).getSum());
    }

    public clone(): GenericVector<Array> {
        return new GenericVector(...this._components as Array);
    }

    public getSum() {
        return this._components.reduce((sum, value) => sum + value);
    }

    public getMaginitude() {
        return this.distance(this.clone().set(0));
    }

    public operation(value: VectorArgument<Array>, operation: ComponentWiseOperation) {
        if (typeof value === "number") {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value);
            }
        } else if (value instanceof GenericVector) {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value._components[i]);
            }
        } else {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value[i as never]);
            }
        }
        return this;
    }

    public toString() {
        return `[ ${this._components.join(", ")} ]`;
    }

    private get _components(): number[] {
        return this.components;
    }

}
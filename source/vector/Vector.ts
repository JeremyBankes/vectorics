import { Vector2, Vector3, Vector4 } from "..";

type ComponentWiseOperation = (operandA: number, operandB: number) => number;

export type Tuple2 = [number, number];
export type Tuple3 = [number, number, number];
export type Tuple4 = [number, number, number, number];
export type TupleN = Tuple2 | Tuple3 | Tuple4 | number[];
export type VectorSource<Tuple extends TupleN> = number | Tuple | Vector<Tuple>;

export class Vector<Tuple extends TupleN> {

    public readonly components: Tuple;

    public constructor(...components: Tuple) {
        this.components = components;
    }

    public add(scalar: number): this;
    public add(vector: Vector<Tuple>): this;
    public add(array: Tuple): this;
    public add(value: VectorSource<Tuple>) { return this.operation(value, (a, b) => a + b); }

    public subtract(scalar: number): this;
    public subtract(vector: Vector<Tuple>): this;
    public subtract(array: Tuple): this;
    public subtract(value: VectorSource<Tuple>) { return this.operation(value, (a, b) => a - b); }

    public multiply(scalar: number): this;
    public multiply(vector: Vector<Tuple>): this;
    public multiply(array: Tuple): this;
    public multiply(value: VectorSource<Tuple>) { return this.operation(value, (a, b) => a * b); }

    public divide(scalar: number): this;
    public divide(vector: Vector<Tuple>): this;
    public divide(array: Tuple): this;
    public divide(value: VectorSource<Tuple>) { return this.operation(value, (a, b) => a / b); }

    public set(scalar: number): this;
    public set(vector: Vector<Tuple>): this;
    public set(array: Tuple): this;
    public set(value: VectorSource<Tuple>) { return this.operation(value, (_, b) => b); }

    public dot(value: Vector<Tuple>) { return this.clone().multiply(value).getSum(); }

    public distance(vector: Vector<Tuple>) {
        const difference = this.clone().subtract(vector);
        return Math.sqrt(difference.multiply(difference).getSum());
    }

    public clone(): Vector<Tuple> {
        return new Vector(...this._components as Tuple);
    }

    public getSum() {
        return this._components.reduce((sum, value) => sum + value);
    }

    public getMagnitude() {
        return this.distance(this.clone().set(0));
    }

    public operation(value: VectorSource<Tuple>, operation: ComponentWiseOperation) {
        if (typeof value === "number") {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value);
            }
        } else if (value instanceof Vector) {
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
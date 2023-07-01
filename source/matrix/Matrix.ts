import { Tuple2, Tuple3, Tuple4 } from "../vector/Vector";

export type Tuple2x2 = [...Tuple2, ...Tuple2];
export type Tuple3x3 = [...Tuple3, ...Tuple3, ...Tuple3];
export type Tuple4x4 = [...Tuple4, ...Tuple4, ...Tuple4, ...Tuple4];
export type TupleNxN = Tuple2x2 | Tuple3x3 | Tuple4x4 | number[];
export type MatrixSource<Tuple extends TupleNxN> = number | Tuple | Matrix<Tuple>;

export class Matrix<Tuple extends TupleNxN> {

    public data: Tuple;
    public readonly size: number;

    public constructor(...data: Tuple) {
        this.data = data;
        this.size = Math.sqrt(data.length);
    }

    public add(scalar: number): this;
    public add(matrix: Matrix<Tuple>): this;
    public add(tuple: Tuple): this;
    public add(value: MatrixSource<Tuple>) {
        const data = this._tuple(value);
        this.data.map((_, index) => this.data[index] += data[index]);
        return this;
    }

    public subtract(scalar: number): this;
    public subtract(matrix: Matrix<Tuple>): this;
    public subtract(tuple: Tuple): this;
    public subtract(value: MatrixSource<Tuple>) {
        const data = this._tuple(value);
        this.data.forEach((_, index) => this.data[index] -= data[index]);
        return this;
    }

    public multiply(scalar: number): this;
    public multiply(matrix: Matrix<Tuple>): this;
    public multiply(tuple: Tuple): this;
    public multiply(value: MatrixSource<Tuple>) {
        const data = this._tuple(value);
        this.data.forEach((_, index) => this.data[index] *= data[index]);
        return this;
    }

    public divide(scalar: number): this;
    public divide(matrix: Matrix<Tuple>): this;
    public divide(tuple: Tuple): this;
    public divide(value: MatrixSource<Tuple>) {
        const data = this._tuple(value);
        this.data.forEach((_, index) => this.data[index] /= data[index]);
        return this;
    }

    public transpose() {
        const matrix = this.clone();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                matrix.data[i * this.size + j] = this.data[j];
            }
        }
        this.data = matrix.data;
    }

    public clone(): Matrix<Tuple> {
        return new Matrix(...this.data);
    }

    private _tuple(value: MatrixSource<Tuple>): Tuple {
        if (typeof value === "number") {
            return new Array(this.size).fill(value) as Tuple;
        } else if (value instanceof Matrix) {
            return value.data;
        } else {
            return value;
        }
    }

}
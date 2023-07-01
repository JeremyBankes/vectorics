import { Vector2, Vector3, Vector4 } from "..";
import { Vector, Tuple2, Tuple3, Tuple4, TupleN, VectorSource } from "./Vector";

export namespace Toolbox {

    export function tuple<Tuple extends TupleN>(size: Tuple["length"], source: VectorSource<Tuple>): Tuple {
        if (typeof source === "number") {
            return new Array(size).fill(source) as Tuple;
        } else if (source instanceof Vector) {
            return source.components;
        } else {
            return source;
        }
    }

    export function fromSource<Tuple extends Tuple2>(size: 2, source: VectorSource<Tuple>): Vector2;
    export function fromSource<Tuple extends Tuple3>(size: 3, source: VectorSource<Tuple>): Vector3;
    export function fromSource<Tuple extends Tuple4>(size: 4, source: VectorSource<Tuple>): Vector4;
    export function fromSource<Tuple extends TupleN>(size: Tuple["length"], source: VectorSource<Tuple>) {
        const tuple = Toolbox.tuple(size, source);
        switch (size) {
            case 2: return new Vector2(...tuple as Tuple2);
            case 3: return new Vector3(...tuple as Tuple3);
            case 4: return new Vector4(...tuple as Tuple4);
            default: return new Vector(...tuple);
        }
    }

}
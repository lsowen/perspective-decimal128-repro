from decimal import Decimal
import pyarrow as pa


def main():
    table = pa.Table.from_arrays(
        [
            pa.array(["a", "b"]),
            pa.array([Decimal("1.1"), Decimal("10.7")], pa.decimal128(5,1)),
            pa.array([2.2, 11.9], pa.float64()),
        ],
        names=["strings", "decimal", "float64"]
    )

    print(table)

    with pa.ipc.new_file("example.arrow", table.schema) as writer:
        writer.write_table(table)


if __name__ == "__main__":
    main()

import { BoxTariffsCreationT, BoxTariffT } from "#types.ts";
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "box_tariffs",
    modelName: "BoxTariffs",
})

//TODO: Add more accurate types to Columns
export default class BoxTariffs extends Model<BoxTariffT, BoxTariffsCreationT> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare boxDeliveryAndStorageExpr: string;

    @Column({
        type: DataType.STRING,
    })
    declare boxDeliveryBase: string;

    @Column({
        type: DataType.STRING,
    })
    declare boxDeliveryLiter: string;

    @Column({
        type: DataType.STRING,
    })
    declare boxStorageBase: string;

    @Column({
        type: DataType.STRING,
    })
    declare boxStorageLiter: string;

    @Column({
        type: DataType.STRING,
    })
    declare warehouseName: string;
}

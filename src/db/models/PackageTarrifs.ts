import { Table, Model, Column, DataType } from "sequelize-typescript";
import type { PartialBy } from "@sequelize/utils";

//TODO: Add visited property
type PackageTariffsT = {
    id: number;
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
};

type PackageTariffsCreationT = PartialBy<PackageTariffsT, "id">;

@Table({
    timestamps: false,
    tableName: "package_tariffs",
    modelName: "PackageTariffs",
})

//TODO: Add more accurate types to Columns
export default class PackageTariffs extends Model<PackageTariffsT, PackageTariffsCreationT> {
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

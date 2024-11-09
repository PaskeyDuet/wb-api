import type { PartialBy } from "@sequelize/utils";
//TODO: create types folder with divided logics
type BoxTariffT = {
    id: number;
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
};
type BoxTariffsCreationT = PartialBy<BoxTariffT, "id">;

type BoxTariffsByWarehouseResDataT = {
    dtNexBox: string;
    dtTillMax: string;
    warehouseList: BoxTariffT[];
};

type BoxTarrifsResponseT = {
    response: { data: BoxTariffsByWarehouseResDataT };
};

type Config = {
    WB_API_KEY: string;
    WB_API_TARIFFS: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    EXPRESS_PORT: string;
    SERVICE_ACCOUNT_EMAIL: string;
    SERVICE_ACCOUNT_SCOPE: string;
    SERVICE_ACCOUNT_PRIVATE_KEY: string;
};

export { BoxTariffT, BoxTariffsCreationT, BoxTariffsByWarehouseResDataT, BoxTarrifsResponseT, Config };

import BoxTariffs from "#db/models/BoxTarrifs.ts";
import { BoxTariffT } from "#types.ts";
import { where } from "sequelize";

//TODO: create universal class to manipulate models
export default {
    findLastTariff: async () => {
        return await BoxTariffs.findOne({ order: [["createdAt", "DESC"]] });
    },
    updateBoxTariff: async (tariff: BoxTariffT) => await BoxTariffs.update(tariff, { where: { warehouseName: tariff.warehouseName } }),
    createBoxTariff: async (tariff: BoxTariffT) => await BoxTariffs.create(tariff),
};

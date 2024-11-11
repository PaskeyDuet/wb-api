import BoxTariffs from "#db/models/BoxTarrifs.js";
import type { BoxTariffT } from "#types.js";
import { Op } from "sequelize";
import moment from "moment";

//TODO: create universal class to manipulate models
export default {
    getAllTodayTariffsObjs: async () => {
        const todayStart = moment().startOf("day").toDate();
        const todayEnd = moment().endOf("day").toDate();
        const tariffsObjs = await BoxTariffs.findAll({
            where: {
                createdAt: {
                    [Op.gte]: todayStart, // Больше или равно началу дня
                    [Op.lte]: todayEnd, // Меньше или равно концу дня
                },
            },
            attributes: { exclude: ["createdAt", "updatedAt", "id"] },
        });
        return tariffsObjs.map((obj) => obj.get());
    },
    findLastTariff: async () => {
        return await BoxTariffs.findOne({ order: [["createdAt", "DESC"]] });
    },
    updateBoxTariff: async (tariff: BoxTariffT) => await BoxTariffs.update(tariff, { where: { warehouseName: tariff.warehouseName } }),
    createBoxTariff: async (tariff: BoxTariffT) => await BoxTariffs.create(tariff),
};

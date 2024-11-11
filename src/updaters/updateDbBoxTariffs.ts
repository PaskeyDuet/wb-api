import boxTarrifsHandler from "#db/handlers/boxTarrifsHandler.js";
import formYMDDate from "#helpers/formYMDDate.js";
import type { BoxTariffT } from "#types.js";

export default async function (boxTarrifsObjs: BoxTariffT[]) {
    const lastTariff = await boxTarrifsHandler.findLastTariff();
    if (lastTariff) {
        const today = formYMDDate.getCurrDate();
        const lastUpdateDay = formYMDDate.getFormatedDateFromDate(lastTariff.createdAt);

        if (today === lastUpdateDay) {
            const updatePromises = boxTarrifsObjs.map((tariff) => boxTarrifsHandler.updateBoxTariff(tariff));
            const updateRes = await Promise.all(updatePromises);
        }
    } else {
        const createPromises = boxTarrifsObjs.map((tariff) => boxTarrifsHandler.createBoxTariff(tariff));
        const createRes = await Promise.all(createPromises);
    }
}

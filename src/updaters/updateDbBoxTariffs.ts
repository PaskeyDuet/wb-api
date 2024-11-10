import boxTarrifsHandler from "#db/handlers/boxTarrifsHandler.ts";
import formYMDDate from "#helpers/formYMDDate.ts";
import guardExp from "#helpers/guardExp.ts";
import { BoxTariffsByWarehouseResDataT, BoxTariffT } from "#types.ts";

export default async function (boxTarrifsObjs: BoxTariffT[]) {
    const lastTariff = await boxTarrifsHandler.findLastTariff();
    if (lastTariff) {
        const today = formYMDDate.getCurrDate();
        guardExp(lastTariff.createdAt, "");
        const lastUpdateDay = formYMDDate.getFormatedDateFromDate(lastTariff.createdAt);

        if (today === lastUpdateDay) {
            const updatePromises = boxTarrifsObjs.map((tariff) => boxTarrifsHandler.updateBoxTariff(tariff));
            const updateRes = await Promise.all(updatePromises);
            console.log("updateRes\n", updateRes);
        }
    } else {
        const createPromises = boxTarrifsObjs.map((tariff) => boxTarrifsHandler.createBoxTariff(tariff));
        const createRes = await Promise.all(createPromises);
        console.log("createRes\n", createRes);
    }
}

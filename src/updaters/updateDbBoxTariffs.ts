import boxTarrifsHandler from "#db/handlers/boxTarrifsHandler.ts";
import formYMDDate from "#helpers/formYMDDate.ts";
import guardExp from "#helpers/guardExp.ts";
import { BoxTariffsByWarehouseResDataT } from "#types.ts";

export default async function (boxTarrifsObj: BoxTariffsByWarehouseResDataT) {
    const warehouseTariffs = boxTarrifsObj.warehouseList;

    const lastTariff = await boxTarrifsHandler.findLastTariff();
    if (lastTariff) {
        const today = formYMDDate.getCurrDate();
        const lastUpdateDay = formYMDDate.getFormatedDate(lastTariff.createdAt);

        if (today === lastUpdateDay) {
            const updatePromises = warehouseTariffs.map((tariff) => boxTarrifsHandler.updateBoxTariff(tariff));
            const updateRes = await Promise.all(updatePromises);
            console.log("updateRes\n", updateRes);
        }
    } else {
        const createPromises = warehouseTariffs.map((tariff) => boxTarrifsHandler.createBoxTariff(tariff));
        const createRes = await Promise.all(createPromises);
        console.log("createRes\n", createRes);
    }
}

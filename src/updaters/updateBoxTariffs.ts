import requestBoxTarrifs from "#dataRequester/requestBoxTarrifs.js";
import boxTarrifsHandler from "#db/handlers/boxTarrifsHandler.js";
import updateDbBoxTariffs from "./updateDbBoxTariffs.js";
import { sortBoxTariffByExpr } from "./updateHelpers.js";
import updateSheetsBoxTarrifs from "./updateSheetsBoxTarrifs.js";

//TODO: updates can be formed dynamically from folders which has update functions
const dbUpdateInterval = 1000 * 60 * 60; //hour
const sheetsUpdateInterval = 1000 * 60 * 60 * 24; //day

export default async function () {
    setInterval(async () => {
        await updateDb();
    }, dbUpdateInterval);
    setInterval(async () => {
        await updateSheets();
    }, sheetsUpdateInterval);
}

async function updateDb() {
    const tariffsData = await requestBoxTarrifs();

    if (tariffsData) {
        const tariffsObj = tariffsData.warehouseList;
        await updateDbBoxTariffs(tariffsObj);
    } else {
        throw new Error("empty tariffsObj");
    }
}

async function updateSheets() {
    const todayTariffsObjs = await boxTarrifsHandler.getAllTodayTariffsObjs();
    const sortedTariffsObjs = sortBoxTariffByExpr(todayTariffsObjs);
    await updateSheetsBoxTarrifs(sortedTariffsObjs);
}

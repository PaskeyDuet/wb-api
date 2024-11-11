import requestBoxTarrifs from "#dataRequester/requestBoxTarrifs.ts";
import boxTarrifsHandler from "#db/handlers/boxTarrifsHandler.ts";
import updateDbBoxTariffs from "./updateDbBoxTariffs.ts";
import { sortBoxTariffByExpr } from "./updateHelpers.ts";
import updateSheetsBoxTarrifs from "./updateSheetsBoxTarrifs.ts";

//TODO: updates can be formed dynamically from folders which has update functions
const dbUpdateInterval = 1000 * 500;
const sheetsUpdateInterval = 1000 * 5;

export default async function () {
    setInterval(async () => {
        await updateDb();
    }, dbUpdateInterval);
    const interval = setInterval(async () => {
        clearInterval(interval);
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

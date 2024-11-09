import requestBoxTarrifs from "#dataRequester/requestBoxTarrifs.ts";
import wbApiReqDate from "#helpers/formYMDDate.ts";
import updateDbBoxTariffs from "./updateDbBoxTariffs.ts";
import updateSheetsBoxTarrifs from "./updateSheetsBoxTarrifs.ts";

//TODO: updates can be formed dynamically from folders which has update functions
const updateInterval = 1000 * 5;
export default async function () {
    setInterval(async () => {
        const tariffsData = await requestBoxTarrifs();
        const tariffsObj = tariffsData;

        if (tariffsObj) {
            const result = await updateDbBoxTariffs(tariffsObj);
            await updateSheetsBoxTarrifs(tariffsObj);
        } else {
            throw new Error("empty tariffsObj");
        }
    }, updateInterval);
}

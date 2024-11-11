import env from "#config.js";
import BoxTariff from "#db/models/BoxTarrifs.js";
import formYMDDate from "#helpers/formYMDDate.js";
import wbApiReqDate from "#helpers/formYMDDate.js";
import { BoxTariffsByWarehouseResDataT, BoxTarrifsResponseT } from "#types.js";
import axios from "axios";
import path from "node:path";

//TODO: Dynamically formed endpoints and params
const endpoint = "box";
const apiBaseURI = env.WB_API_TARIFFS;
const URI = path.join(apiBaseURI, endpoint);

export default async function (): Promise<BoxTariffsByWarehouseResDataT | null> {
    const dateParam = formYMDDate.getCurrDate();
    const response = await axios.get(URI, {
        params: { date: dateParam },
        headers: {
            Authorization: env.WB_API_KEY,
            Accept: "application/json",
        },
    });
    //TODO: create detalized error catcher
    if (response.status === 200) {
        const endpointData: BoxTarrifsResponseT = response.data;
        const responseData: BoxTariffsByWarehouseResDataT = endpointData.response.data;

        return responseData;
    }
    return null;
}

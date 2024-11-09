import env from "#config.ts";
import BoxTariff from "#db/models/BoxTarrifs.ts";
import formYMDDate from "#helpers/formYMDDate.ts";
import wbApiReqDate from "#helpers/formYMDDate.ts";
import { BoxTariffsByWarehouseResDataT, BoxTarrifsResponseT } from "#types.ts";
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

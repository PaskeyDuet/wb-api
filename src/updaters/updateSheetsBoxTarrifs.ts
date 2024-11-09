import env from "#config.ts";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import uppercaseLetters from "#helpers/englishUpperLetters.ts";
import { BoxTariffsByWarehouseResDataT } from "#types.ts";

//TODO: create extended from GoogleSpreadsheet class with additional methods
//It is better to use classes to save table inner relations (f.e. Map with letters linked with keys)
//TODO: Move ids and service account data to db
const spreadSheetsIDs = [
    "1rqfWXHNYf43FvX0VgNZLLH86gSpZqwc0f_89AST4XmU",
    // "1N01WvfoZ6oObA81ESr5a9PnL0Q5hwPj7Ct9IU09Y1mE",
    // "16MWAy5yDbjWhT81qlo461d3D7hg9BssSzhOWewAvhag",
];
const sheetName = "stocks_coefs";
const serviceAccountAuth = new JWT({
    email: env.SERVICE_ACCOUNT_EMAIL,
    key: env.SERVICE_ACCOUNT_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
    scopes: [env.SERVICE_ACCOUNT_SCOPE],
});

export default async function (boxTarrifsObj: BoxTariffsByWarehouseResDataT) {
    try {
        const warehouseTariffs = boxTarrifsObj.warehouseList;
        const updatePromises = spreadSheetsIDs.map(async (id) => {
            return await sheetUpdater(id, serviceAccountAuth, warehouseTariffs);
        });
        const updateRes = await Promise.all(updatePromises);
        console.log("updatedRes: \n", updateRes);
    } catch (error) {
        throw new Error("Error updating sheets box tariffs");
    }
}

async function sheetUpdater(spreadsheetId: string, serviceAccount: JWT, objs: Object[]) {
    const h = googleSpreadsheetHelpers;
    const doc = await h.loadGoogleSheet(spreadsheetId, serviceAccount);
    const sheet = h.getSheetByTitle(doc, sheetName);
    const topCellsEmpty = await h.areTopCellsEmpty(sheet);
    if (topCellsEmpty) {
        h.fillTopCellsWithKeys(sheet, objs[0]);
    }
}

const googleSpreadsheetHelpers = {
    loadGoogleSheet: async (spreadSheetsID: string, serviceAccount: JWT): Promise<GoogleSpreadsheet> => {
        try {
            const doc = new GoogleSpreadsheet(spreadSheetsIDs[0], serviceAccount);
            await doc.loadInfo();
            return doc;
        } catch (error) {
            throw new Error(`Can't load sheet. Id: ${spreadSheetsID}`);
        }
    },

    getSheetByTitle: (doc: GoogleSpreadsheet, sheetName: string) => {
        const sheet = doc.sheetsByTitle[sheetName];
        if (sheet) {
            return sheet;
        }
        throw new Error(`Can't find sheet by name: ${sheetName}`);
    },

    areTopCellsEmpty: async (sheet: GoogleSpreadsheetWorksheet): Promise<boolean> => {
        await sheet.loadCells(`A1:Z1`);
        const data = await sheet.getCellsInRange(`A1:Z1`);
        return data ? false : true;
    },
    fillTopCellsWithKeys: async (sheet: GoogleSpreadsheetWorksheet, obj: Object) => {
        try {
            const objKeys = Object.keys(obj);
            objKeys.map(async (key, index) => {
                const letter = uppercaseLetters[index];
                const cell = sheet.getCellByA1(`${letter}1`);
                cell.value = key;
            });
            await sheet.saveUpdatedCells();
        } catch (error) {
            throw new Error("Can't update top cells");
        }
    },
};

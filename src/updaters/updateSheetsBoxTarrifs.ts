import env from "#config.ts";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import uppercaseLetters from "#helpers/englishUpperLetters.ts";
import { BoxTariffsByWarehouseResDataT, BoxTariffT } from "#types.ts";
import formYMDDate from "#helpers/formYMDDate.ts";

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

export default async function (boxTarrifsObjs: BoxTariffT[]) {
    try {
        const updatePromises = spreadSheetsIDs.map(async (id) => {
            return sheetUpdater(id, serviceAccountAuth, boxTarrifsObjs);
        });
        const updateRes = await Promise.all(updatePromises);
    } catch (error) {
        throw new Error("Error updating sheets box tariffs");
    }
}
//TODO: it's necessary to unite db and sheet updaters to create same logic but with different handlers
//F.E. if no data, if new date etc.
//TODO: Make sheetUpdater create less reading operations - quota is limited
async function sheetUpdater(spreadsheetId: string, serviceAccount: JWT, objs: Object[]) {
    try {
        const h = googleSpreadsheetHelpers;
        const doc = await h.loadGoogleSheet(spreadsheetId, serviceAccount);
        const sheet = h.getSheetByTitle(doc, sheetName);

        let counter = 1;
        //TODO: Change .areCellsEmpty to .loadHeader and .headerValues
        const topCellsEmpty = await h.areCellsEmpty(sheet, counter);
        const objUnit = objs[0];

        if (topCellsEmpty) {
            counter = await h.fillTopCellsWithKeysOrValues(sheet, objUnit, counter, "keys");
        }
        const rowObjs = objs.map(h.createRowObject);
        const letterRange = h.rangeByObjKeys(objUnit);
        await h.addCurrentDateCell(sheet);
        await sheet.addRows(rowObjs);
    } catch (error) {
        console.error(error);
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
    areCellsEmpty: async (sheet: GoogleSpreadsheetWorksheet, counter: number): Promise<boolean> => {
        await sheet.loadCells(`A${counter}:Z${counter}`);
        const data = await sheet.getCellsInRange(`A${counter}:Z${counter}`);
        return data ? false : true;
    },
    fillTopCellsWithKeysOrValues: async (sheet: GoogleSpreadsheetWorksheet, obj: Object, counter: number, mode: "keys" | "values") => {
        try {
            const objKeys = Object[mode](obj);
            objKeys.map(async (el, index) => {
                const letter = uppercaseLetters[index];
                const cell = sheet.getCellByA1(`${letter}1`);
                cell.value = el;
            });
            await sheet.saveUpdatedCells();
            return counter + 1;
        } catch (error) {
            throw new Error("Can't update top cells");
        }
    },
    fillSheetByObjsValues: async function (sheet: GoogleSpreadsheetWorksheet, objs: Object[], counter: number) {
        const cellsAreEmpty = await this.areCellsEmpty(sheet, counter);
        if (cellsAreEmpty) {
        }
    },
    createRowObject: (objToTransform: Object) => {
        return Object.fromEntries(Object.entries(objToTransform));
    },
    addRowFromObj: async function (sheet: GoogleSpreadsheetWorksheet, obj: Object) {
        const rows = await sheet.addRow(this.createRowObject(obj));
        console.log("rows: ", rows);
    },
    rangeByObjKeys: (obj: Object): [string, string] => {
        const keys = Object.keys(obj);
        const startLetter = "A";
        const endLetter = uppercaseLetters[keys.length - 1];
        return [`${startLetter}`, `${endLetter}`];
    },
    firstEmptyCellNumber: async (sheet: GoogleSpreadsheetWorksheet): Promise<number> => {
        let counter = 1;
        await sheet.loadCells(`A1`);
        let cellData = sheet.getCellByA1("A1");

        while (cellData.value !== null) {
            counter += 1;
            await sheet.loadCells(`A${counter}`);
            cellData = await sheet.getCellByA1(`A${counter}`);
        }
        return counter;
    },
    addCurrentDateCell: async function (sheet: GoogleSpreadsheetWorksheet) {
        const firstEmptyCell = await this.firstEmptyCellNumber(sheet);
        const cellId = `A${firstEmptyCell}`;
        await sheet.loadCells(cellId);
        const cellData = await sheet.getCellByA1(cellId);
        cellData.value = formYMDDate.getCurrDate();
        await sheet.saveUpdatedCells();
    },
    // mergeCellsInRange: (sheet:GoogleSpreadsheetWorksheet, startLetter: string, endLetter: string, index: number) =>{

    //     const emptyCellNumber = await h.firstEmptyCellNumber(sheet);
    //     const [startLetter, endLetter] = h.rangeByObjKeys(objUnit)
    //     await sheet.mergeCells(`${startLetter}${emptyCellNumber}:${endLetter}${emptyCellNumber}`)
    // }
};

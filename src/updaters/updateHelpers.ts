import type { BoxTariffT } from "#types.js";

//TODO: Move functions below to boxTariffs helpers
const sortBoxTariffByExpr = (objs: BoxTariffT[]) => {
    return objs.sort((a, b) => {
        return Number(a.boxDeliveryAndStorageExpr) - Number(b.boxDeliveryAndStorageExpr);
    });
};
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export { sortBoxTariffByExpr, delay };

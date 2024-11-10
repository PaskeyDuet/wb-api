import { BoxTariffT } from "#types.ts";

//TODO: Move functions below to boxTariffs helpers
const sortBoxTariffByExpr = (objs: BoxTariffT[]) => {
    return objs.sort((a, b) => {
        return Number(a.boxDeliveryAndStorageExpr) - Number(b.boxDeliveryAndStorageExpr);
    });
};

export { sortBoxTariffByExpr };

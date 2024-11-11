import type { PartialBy } from "@sequelize/utils";
/**
 * Типы данных для проекта.
 *
 * @module types
 */
//TODO: create types folder with divided logics
/**
 * Объект, хранящий в себе тариф для короба по складам
 *
 * @property {number} id DbId
 * @property {string} boxDeliveryAndStorageExpr Коэффициент, %. На него умножается стоимость доставки и хранения. Во всех тарифах этот коэффициент уже учтён
 * @property {string} boxDeliveryBase Доставка 1 литра, ₽
 * @property {string} boxDeliveryLiter Доставка каждого дополнительного литра, ₽
 * @property {string} boxStorageBase Хранение 1 литра, ₽
 * @property {string} boxStorageLiter Хранение каждого дополнительного литра, ₽
 * @property {string} warehouseName Название склада
 * @property {string} createdAt Дата создания записи в бд
 * @property {string} updatedAt Дата обновления записи в бд
 */
type BoxTariffT = {
    id: number;
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
    createdAt: string;
    updatedAt: string;
};
/**
 * BoxTariffT - Объект, хранящий в себе тариф для короба по складам
 *
 * @property {number} [id] -Optional- DbId
 * @property {string} boxDeliveryAndStorageExpr Коэффициент, %. На него умножается стоимость доставки и хранения. Во всех тарифах этот коэффициент уже учтён
 * @property {string} boxDeliveryBase Доставка 1 литра, ₽
 * @property {string} boxDeliveryLiter Доставка каждого дополнительного литра, ₽
 * @property {string} boxStorageBase Хранение 1 литра, ₽
 * @property {string} boxStorageLiter Хранение каждого дополнительного литра, ₽
 * @property {string} warehouseName Название склада
 * @property {string} [createdAt] -Optional- Дата создания записи в бд
 * @property {string} [updatedAt] -Optional- Дата обновления записи в бд
 */
type BoxTariffsCreationT = PartialBy<BoxTariffT, "id" | "createdAt" | "updatedAt">;
/**
 * Объект, содержащий данные о тарифах коробок по складам приходящий внутри response
 *
 * @property {string} dtNexBox - Дата начала следующего тарифа.
 * @property {string} dtTillMax - Дата окончания последнего установленного тарифа.
 * @property {BoxTariffT[]} warehouseList - Список тарифов коробок по складам.
 */
type BoxTariffsByWarehouseResDataT = {
    dtNexBox: string;
    dtTillMax: string;
    warehouseList: BoxTariffT[];
};
/**
 * Объект, содержащий полный ответ с тарифами коробок.
 *
 * @property {Object} response - Объект ответа.
 * @property {BoxTariffsByWarehouseResDataT} response.data - Данные о тарифах коробок по складам.
 */
type BoxTarrifsResponseT = {
    response: { data: BoxTariffsByWarehouseResDataT };
};
/**
 * Конфигурационные параметры приложения.
 *
 * @property {string} WB_API_KEY - Ключ API Wildberries для аутентификации запросов.
 * @property {string} WB_API_TARIFFS - Endpoint для получения тарифов Wildberries.
 * @property {string} DB_NAME - Название базы данных.
 * @property {string} DB_USERNAME - Имя пользователя базы данных.
 * @property {string} DB_PASSWORD - Пароль пользователя базы данных.
 * @property {string} DB_HOST - Адрес хоста базы данных.
 * @property {string} DB_PORT - Порт подключения к базе данных.
 * @property {string} EXPRESS_PORT - Порт, на котором будет работать Express-сервер.
 * @property {string} SERVICE_ACCOUNT_EMAIL - Электронная почта сервисного аккаунта для аутентификации.
 * @property {string} SERVICE_ACCOUNT_SCOPE - Области доступа для сервисного аккаунта.
 * @property {string} SERVICE_ACCOUNT_PRIVATE_KEY - Приватный ключ сервисного аккаунта для подписи запросов.
 * @property {string} SPREADSHEET_IDS - Массив строк spreadsheet ids разделенный с помощью '|'
 */
type Config = {
    WB_API_KEY: string;
    WB_API_TARIFFS: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    EXPRESS_PORT: string;
    SERVICE_ACCOUNT_EMAIL: string;
    SERVICE_ACCOUNT_SCOPE: string;
    SERVICE_ACCOUNT_PRIVATE_KEY: string;
    SPREADSHEET_IDS: string;
};

export type { BoxTariffT, BoxTariffsCreationT, BoxTariffsByWarehouseResDataT, BoxTarrifsResponseT, Config };

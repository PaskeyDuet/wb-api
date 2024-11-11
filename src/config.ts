import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import path from "node:path";
import dotenv from "dotenv";
import type { Config } from "#types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
/**
 * Конфигурация окружения приложения.
 *
 * @property {string | undefined} WB_API_KEY - Ключ API Wildberries.
 * @property {string | undefined} WB_API_TARIFFS - Endpoint для тарифов Wildberries.
 * @property {string | undefined} DB_NAME - Название базы данных.
 * @property {string | undefined} DB_USERNAME - Имя пользователя базы данных.
 * @property {string | undefined} DB_PASSWORD - Пароль пользователя базы данных.
 * @property {string | undefined} DB_HOST - Адрес хоста базы данных.
 * @property {string | undefined} DB_PORT - Порт базы данных.
 * @property {string | undefined} EXPRESS_PORT - Порт для Express-сервера.
 * @property {string | undefined} SERVICE_ACCOUNT_EMAIL - Email сервисного аккаунта.
 * @property {string | undefined} SERVICE_ACCOUNT_SCOPE - Области доступа для сервисного аккаунта.
 * @property {string | undefined} SERVICE_ACCOUNT_PRIVATE_KEY - Приватный ключ сервисного аккаунта.
 */
type ENV = {
    WB_API_KEY: string | undefined;
    WB_API_TARIFFS: string | undefined;
    DB_NAME: string | undefined;
    DB_USERNAME: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_HOST: string | undefined;
    DB_PORT: string | undefined;
    EXPRESS_PORT: string | undefined;
    SERVICE_ACCOUNT_EMAIL: string | undefined;
    SERVICE_ACCOUNT_SCOPE: string | undefined;
    SERVICE_ACCOUNT_PRIVATE_KEY: string | undefined;
    SPREADSHEET_IDS: string | undefined;
};

// Loading process.env as ENV interface
const getConfig = (): ENV => {
    return {
        WB_API_KEY: process.env.WB_API_KEY,
        WB_API_TARIFFS: process.env.WB_API_TARIFFS,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        EXPRESS_PORT: process.env.EXPRESS_PORT,
        SERVICE_ACCOUNT_EMAIL: process.env.SERVICE_ACCOUNT_EMAIL,
        SERVICE_ACCOUNT_SCOPE: process.env.SERVICE_ACCOUNT_SCOPE,
        SERVICE_ACCOUNT_PRIVATE_KEY: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
        SPREADSHEET_IDS: process.env.SPREADSHEET_IDS,
    };
};

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (!value) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

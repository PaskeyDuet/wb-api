import express, { type Express } from "express";
import type { Config } from "#types.js";
import dbConnection from "#db/dbConnection.js";
import type { Sequelize } from "sequelize-typescript";
import { delay } from "#updaters/updateHelpers.js";

export default async function initializeApp(env: Config) {
    try {
        const client = await connectWithRetry(env, 5, 60000);
        await syncDatabase(client);
        await raiseServer(env.EXPRESS_PORT);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Произошла неизвестная ошибка при создании подключений: \n", error);
        }
        process.exit(1);
    }
}

const syncDatabase = async (client: Sequelize) => {
    await client.sync({ alter: true });
};

const raiseServer = (port: string) => {
    const app: Express = express();
    app.get("/", (req, res) => res.send("Server is running"));
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
};

const connectWithRetry = async (env: Config, retries: number, delayMs: number): Promise<Sequelize> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Попытка подключения к базе данных (попытка ${attempt} из ${retries})...`);
            const client = dbConnection(env);

            if (!client) {
                throw new Error("Не удалось создать клиент базы данных.");
            }

            await client.authenticate();
            console.log("Подключение к базе данных успешно установлено.");
            return client;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Ошибка подключения к базе данных: ${error.message}`);
            } else {
                console.error("Неизвестная ошибка при подключении к базе данных.");
            }

            if (attempt < retries) {
                console.log(`Ожидание ${delayMs / 1000} секунд перед следующей попыткой...`);
                await delay(delayMs);
            } else {
                console.error("Все попытки подключения к базе данных завершились неудачей.");
                throw error;
            }
        }
    }
    throw new Error("Не удалось подключиться к базе данных.");
};

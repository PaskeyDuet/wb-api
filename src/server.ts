import express, { type Express } from "express";
import type { Config } from "#config.ts";
import dbConnection from "#db/dbConnection.ts";
import type { Sequelize } from "sequelize-typescript";
import PackageTariffs from "#db/models/PackageTarrifs.ts";

export default async function (env: Config) {
    try {
        const client = dbConnection(env);
        await syncDatabase(client);
        await raiseServer(env.EXPRESS_PORT);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Произошла неизвестная ошибка при создании подключений: \n", error);
        }
    }
}

const syncDatabase = async (client: Sequelize | null) => {
    if (!client) {
        throw new Error("empty client");
    }
    await client.sync({ alter: true });
};
const raiseServer = (port: string) => {
    const app = express();
    app.get("/", (req, res) => console.log(req.body));
    app.listen(port, () => console.log(`Server is listening port ${port}`));
};

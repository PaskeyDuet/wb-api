import { Sequelize } from "sequelize-typescript";
import PackageTariffs from "./models/BoxTarrifs.ts";
import { Config } from "#types.ts";

export default (env: Config) => {
    try {
        const dbObj = {
            database: env.DB_NAME,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            host: env.DB_HOST,
            port: Number(env.DB_PORT),
        };

        return new Sequelize({
            dialect: "postgres",
            logging: false,
            ...dbObj,
            models: [PackageTariffs],
        });
    } catch (err) {
        console.error("Database connection error:", err);
        return null;
    }
};

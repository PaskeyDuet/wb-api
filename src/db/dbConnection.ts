import { Sequelize } from "sequelize-typescript";
import type { Config } from "#config.ts";
import PackageTariffs from "./models/PackageTarrifs.ts";

export default (env: Config) => {
    try {
        const dbObj = {
            database: env.DB_NAME,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            host: env.DB_HOST,
            port: 5433,
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

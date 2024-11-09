declare global {
    namespace NodeJS {
        interface ProcessEnv {
            WB_API_KEY: string;
            DB_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: string;
        }
    }
}

export {};

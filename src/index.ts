import server from "#server.ts";
import env from "#config.ts";

(async () => {
    try {
        await server(env);
    } catch (error) {
        console.error(error);
    }
})();

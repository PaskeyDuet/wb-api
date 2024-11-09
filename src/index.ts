import server from "#server.ts";
import env from "#config.ts";
import updateBoxTariffs from "#updaters/updateBoxTariffs.ts";

(async () => {
    try {
        await server(env);
        await updateBoxTariffs();
    } catch (error) {
        console.error(error);
    }
})();

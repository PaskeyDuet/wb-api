import server from "#server.js";
import env from "#config.js";
import updateBoxTariffs from "#updaters/updateBoxTariffs.js";

(async () => {
    try {
        await server(env);
        await updateBoxTariffs();
    } catch (error) {
        console.error(error);
    }
})();

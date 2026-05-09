import * as server from "../dist/server/server.js";

export default async function handler(req, res) {
    if (typeof server.default === "function") {
        return server.default(req, res);
    }

    if (typeof server.handler === "function") {
        return server.handler(req, res);
    }

    throw new Error("No valid server handler found");
}